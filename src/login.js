(() => {

        //-------- Global Variables ------------

        // DEV-ONLY BYPASS: when true, the login screen auto-fills a
        // hardcoded admin token and reloads into the app after a
        // short delay. Left exactly as in the original file — this
        // MUST be verified/disabled by the deploy process before any
        // real release, but flipping it here would change behavior,
        // so it is intentionally untouched.
        const DEVELOP_MODE = import.meta.env.VITE_DEV_MODE === "true";

        // OTP code length required by the /verify-otp endpoint.
        const OTP_LENGTH = 4;

        // How long the "forgot password" view polls /reset-status
        // before giving up and returning to the login view.
        const RESET_COUNTDOWN_SECONDS = 120;

        // How long a submit button stays disabled after a login
        // attempt, to prevent double-submits while the request/UI
        // settles.
        const SUBMIT_LOCK_MS = 3000;

        // Minimum accepted password length for the password-login
        // form (server is the source of truth; this is a fast
        // client-side check only).
        const MIN_LOGIN_PASSWORD_LENGTH = 6;

        // Minimum accepted length when *setting* a new password
        // (forced first-login change / forgot-password flow).
        const MIN_NEW_PASSWORD_LENGTH = 8;

        const IRAN_MOBILE_REGEX = /^09\d{9}$/;

        const state = {
            loginMode: "pass",
            countdownActive: false,
            resetPolling: null,
            secondsLeft: RESET_COUNTDOWN_SECONDS
        };


        const dom = {
            views: {
                login: document.getElementById("loginView"),
                forget: document.getElementById("forgetView"),
                otp: document.getElementById("otpView"),
                changePass: document.getElementById("changePasswordView")
            },

            form: document.getElementById("loginForm"),
            submitBtn: document.querySelector('#loginForm button[type="submit"]'),
            username: document.getElementById("username"),
            usernameLabel: document.getElementById("usernameLabel"),
            password: document.getElementById("password"),
            passField: document.getElementById("passField"),
            countdown: document.getElementById("countdown"),
            toastContainer: document.getElementById("toast-container"),
            otpInputs: document.querySelectorAll(".otp-input")
        };


        const APP_MESSAGES = Object.freeze({
            auth: {
                login_success: "ورود با موفقیت انجام شد.",
                login_failed: "نام کاربری یا رمز عبور اشتباه است.",
                Too_many_requests: "بیش از حد تلاش کرده‌اید.",
                Unauthorized: "نام کاربری و رمز عبور صحیح نمیباشد",
                otp_sent: "کد یکبار مصرف برای شما ارسال شد.",
                otp_invalid: "کد اشتباه است.",
                otp_incomplete: "کد کامل نیست.",
                change_password_required: "برای امنیت بیشتر رمز خود را عوض کنید.",
                password_changed: "رمز عبور با موفقیت تغییر یافت.",
                password_change_failed: "خطا در تغییر رمز عبور رخ داد.",
                password_invalid: "رمز اشتباه است"
            },
            validation: {
                invalid_mobile: "شماره موبایل اشتباه است.",
                credentials_required: "نام کاربری و پسورد الزامی است.",
                password_too_short: "پسورد حداقل ۶ کاراکتر باید باشد.",
                all_fields_required: "همه فیلدها الزامی است.",
                new_password_too_short: "رمز جدید حداقل ۸ کاراکتر باید باشد.",
                passwords_do_not_match: "رمزها یکسان نیستند."
            }
        });


        // Exposed for the inline onclick="" handlers in the markup
        // above. Kept as-is (not switching to addEventListener) to
        // avoid touching markup/behavior beyond what's needed.
        window.verifyOtp = verifyOtp;
        window.switchTab = switchTab;
        window.showView = showView;
        window.backButton = () => showView("loginView");
        window.changePassword = changePassword;

        // -------------End of Global Variables----------


        if (DEVELOP_MODE) {
            showToast("شما در حالت توسعه میباشید و تا چند ثانیه دیگه وارد برنامه میشوید", "info", 7000)
            setTimeout(() => {
                localStorage.setItem("rm_token", "9Myb7IagCZjdQDY9SACqEj7mNAThLXEg");
                localStorage.setItem("rm_user", "admin");
                location.reload()
            }, 7000)
        }


        // Enter as PWA APP
        const params = new URLSearchParams(location.hash.slice(1));
        const value = params.get("rm_auto_login");
        if (value) {
            const auth = JSON.parse(value);
            localStorage.setItem("rm_token", auth.token);
            localStorage.setItem("rm_user", JSON.stringify({role: auth.role}));
            history.replaceState(null, "", location.pathname + location.search);
            location.reload();
        }


        const token = localStorage.getItem('rm_token');

        if (token) {
            window.location.href = "app.html";
        }


        /* =========================
           API LAYER
        ========================= */

        async function api(endpoint, options = {}) {

            const config = {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                ...options
            };

            if (config.body && typeof config.body !== "string") {
                config.body = JSON.stringify(config.body);
            }

            // const res = await fetch(API_BASE + endpoint, config);
            const res = await fetch(endpoint, config);


            if (!res.ok) {
                throw new Error(`API_ERROR_${res.status}`);
            }

            const type = res.headers.get("content-type");

            if (type?.includes("application/json")) {
                return res.json();
            }

            return res.text();
        }


        dom.username.focus()


        /**
         * Renders a transient toast notification.
         * @param {string} message - Persian-language text to display.
         * @param {"info"|"success"|"error"} type - visual style, also
         *   used to pick the accent background color.
         * @param {number} duration - ms before auto-dismiss.
         */
        function showToast(message, type = "info", duration = 3000) {

            const toast = document.createElement("div");
            toast.className = `toast ${type}`;

            toast.innerHTML = `
                <div class="toast-content">
                    <span class="toast-message">${message}</span>
                </div>
                <button class="toast-close">&times;</button>
            `;

            dom.toastContainer.appendChild(toast);

            const close = () => {
                toast.classList.remove("show");
                setTimeout(() => toast.remove(), 250);
            };

            setTimeout(() => toast.classList.add("show"), 10);

            const auto = setTimeout(close, duration);

            toast.querySelector(".toast-close").onclick = () => {
                clearTimeout(auto);
                close();
            };
        }


        /**
         * Swaps the visible auth view. Starts/stops the forgot-password
         * countdown+polling as a side effect of entering/leaving that view.
         */
        function showView(viewId) {

            Object.values(dom.views).forEach(v => v.classList.add("hidden"));

            document.getElementById(viewId).classList.remove("hidden");

            if (viewId === "forgetView") startResetProcess();
            else stopResetProcess();
        }

        /**
         * Toggles the login form between password mode and OTP mode.
         * Business rule: OTP mode always uses the mobile number as the
         * identifier (tel input, numeric keypad, 11-char max), and the
         * password field is hidden entirely rather than just disabled.
         */
        function switchTab(mode) {
            state.loginMode = mode;

            document.querySelectorAll(".tab").forEach(tab => {
                tab.classList.toggle(
                    "active",
                    tab.textContent.includes(mode === "otp" ? "کد" : "رمز")
                );
            });

            const isOtp = mode === "otp";

            dom.passField.style.display = isOtp ? "none" : "block";

            if (isOtp) {
                dom.usernameLabel.textContent = "شماره موبایل";
                dom.username.type = "tel";
                dom.username.placeholder = "09xxxxxxxxx";
                dom.username.maxLength = 11;
                dom.username.inputMode = "numeric";
                dom.username.value = "";
            } else {
                dom.usernameLabel.textContent = "نام کاربری";
                dom.username.type = "text";
                dom.username.placeholder = "admin";
                dom.username.maxLength = 11;
                dom.username.inputMode = "text";
                dom.username.value = "";
            }

            dom.username.focus();
        }


        /* =========================
           FORGOT-PASSWORD COUNTDOWN
           Business rule: the "forget password" view assumes a human
           operator resets the account out-of-band (e.g. holding a
           physical "repass" button per the UI copy). This page just
           polls a status endpoint for up to RESET_COUNTDOWN_SECONDS
           and bounces back to login either when the server reports
           "reset" or when the countdown reaches zero.
        ========================= */

        function startResetProcess() {

            state.secondsLeft = RESET_COUNTDOWN_SECONDS;
            state.countdownActive = true;

            updateCountdown();

            clearInterval(state.resetPolling);

            state.resetPolling = setInterval(checkResetStatus, 1000);
        }

        function stopResetProcess() {

            state.countdownActive = false;

            if (state.resetPolling) {
                clearInterval(state.resetPolling);
            }
        }

        async function checkResetStatus() {

            if (!state.countdownActive) return;

            try {

                const res = await fetch("/reset-status");
                const txt = await res.text();

                if (txt === "reset") {
                    stopResetProcess();
                    showView("loginView");
                }

            } catch {
                // Network hiccups are silently ignored; the next poll
                // tick will simply try again.
            }
        }

        function updateCountdown() {

            if (!state.countdownActive) return;

            const m = Math.floor(state.secondsLeft / 60);
            const s = state.secondsLeft % 60;

            dom.countdown.textContent =
                `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

            if (state.secondsLeft > 0) {
                state.secondsLeft--;
                setTimeout(updateCountdown, 1000);
            } else {
                showView("loginView");
            }
        }


        /* =========================
           LOGIN SUBMISSION
        ========================= */

        /**
         * Fast client-side validation before hitting the network.
         * Returns a Persian error message, or null when valid.
         */
        function validateLogin(username, password, isOtp) {
            if (isOtp) {
                if (!username) return APP_MESSAGES.validation.invalid_mobile;
                if (!IRAN_MOBILE_REGEX.test(username)) return APP_MESSAGES.validation.invalid_mobile;
                return null;
            }

            if (!username || !password)
                return APP_MESSAGES.validation.credentials_required;

            if (password.length < MIN_LOGIN_PASSWORD_LENGTH)
                return APP_MESSAGES.validation.password_too_short;

            return null;
        }


        async function handleLoginSubmit(e) {

            e.preventDefault();

            const btn = dom.submitBtn;
            const username = dom.username.value;
            const password = dom.password.value;
            const isOtp = state.loginMode === "otp";

            btn.classList.toggle("loading", true);

            const error = validateLogin(username, password, isOtp);

            if (error) {
                showToast(error, "error");
                btn.classList.toggle("loading", false);
                return;
            }

            try {

                if (isOtp) await handleOtpLogin(username);
                else await handlePasswordLogin(username, password);

            } finally {
                btn.classList.toggle("loading", false);
            }
        }


        async function handleOtpLogin(username) {
            const btn = dom.submitBtn;
            btn.disabled = true;

            setTimeout(() => {
                btn.disabled = false;
            }, SUBMIT_LOCK_MS);


            await api("/send-otp", {
                method: "POST",
                body: {username}
            });

            showView("otpView");

            dom.otpInputs[0].focus();
        }


        async function handlePasswordLogin(username, password) {
            const btn = dom.submitBtn;

            btn.disabled = true;

            setTimeout(() => {
                btn.disabled = false;
            }, SUBMIT_LOCK_MS);

            try {
                const response = await api("api/login", {
                    method: "POST",
                    body: {username, password}
                });

                if (!response?.success) return;

                // Business rule: accounts flagged isFirstTime must set
                // a new password before receiving an auth token.
                if (response.isFirstTime) {
                    if (!username) return;

                    localStorage.setItem("username", username);
                    showToast(APP_MESSAGES.auth.change_password_required, "info");
                    showView("changePasswordView");
                    return;
                }

                if (!response.token) return;

                localStorage.setItem("rm_token", response.token);
                localStorage.setItem("rm_user", JSON.stringify({role: response.role}));
                location.reload();
            } catch (error) {
                handleLoginError(error);
            }
        }


        function handleLoginError(err) {
            const errorMessage = err.message || "";

            if (errorMessage.includes("429")) {
                showToast(APP_MESSAGES.auth.Too_many_requests, "error");
                return;
            }

            if (errorMessage.includes("401")) {
                showToast(APP_MESSAGES.auth.Unauthorized, "error");
            }
        }


        async function verifyOtp() {

            let code = "";

            dom.otpInputs.forEach(i => code += i.value);

            if (code.length !== OTP_LENGTH) {
                showToast(APP_MESSAGES.auth.otp_incomplete, "error");
                return;
            }

            try {

                const res = await api("/verify-otp", {
                    method: "POST",
                    body: {code}
                });

                localStorage.setItem("rm_token", res.token);

                window.location.href = "app.html";

            } catch {
                showToast(APP_MESSAGES.auth.otp_invalid, "error");
            }
        }


        async function changePassword() {
            const oldPassword = document.getElementById("oldPassword")?.value.trim();
            const newPassword = document.getElementById("newPassword")?.value.trim();
            const confirmPassword = document.getElementById("confirmPassword")?.value.trim();
            const changePasswordButton = document.getElementById("changePasswordButton");
            const username = localStorage.getItem("username");

            if (!oldPassword || !newPassword || !confirmPassword) {
                showToast(APP_MESSAGES.validation.all_fields_required, "error");
                return;
            }

            if (!username) {
                showToast(APP_MESSAGES.auth.password_change_failed, "error");
                return;
            }

            if (newPassword.length < MIN_NEW_PASSWORD_LENGTH) {
                showToast(APP_MESSAGES.validation.new_password_too_short, "error");
                return;
            }

            if (newPassword !== confirmPassword) {
                showToast(APP_MESSAGES.validation.passwords_do_not_match, "error");
                return;
            }

            changePasswordButton.disabled = true;

            setTimeout(() => {
                changePasswordButton.disabled = false;
            }, SUBMIT_LOCK_MS);

            try {
                const res = await api("api/change-password", {
                    method: "POST",
                    body: {
                        username,
                        oldPassword,
                        newPassword
                    }
                });

                if (!res?.success || !res.token) {
                    showToast(APP_MESSAGES.auth.password_change_failed, "error");
                    return;
                }

                localStorage.removeItem("username");
                showToast(APP_MESSAGES.auth.password_changed, "success");

                setTimeout(() => {
                    location.reload();
                }, 1300);

            } catch (err) {
                const errorMessage = err.message || "";
                if (errorMessage.includes("401")) {
                    showToast(APP_MESSAGES.auth.password_invalid, "error");
                    return;
                }

                showToast(APP_MESSAGES.auth.password_change_failed, "error");
            }
        }


        /* =========================
           EVENTS
        ========================= */


        dom.form.addEventListener("submit", handleLoginSubmit);

        dom.otpInputs.forEach((input, index, arr) => {
            input.addEventListener("input", () => {
                if (input.value.length === 1 && arr[index + 1]) {
                    arr[index + 1].focus();
                }
            });
        });

        dom.username.addEventListener("input", () => {
            if (state.loginMode === "otp") {
                dom.username.value = dom.username.value.replace(/\D/g, "").slice(0, 11);
            }
        });


    })();

