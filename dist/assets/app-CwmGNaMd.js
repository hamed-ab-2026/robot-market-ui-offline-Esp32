import"./modulepreload-polyfill-Dezn_h7o.js";var e=document.getElementById(`app`),t=document.getElementById(`loader`),n=null,r=null,i=`week`,a={},o=null,s=null,c=!1,l={},u=null,d=null,f=null,p=null,m=null,h=null,g=null,_=null,v={bell:`
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M10.268 21a2 2 0 0 0 3.464 0"></path> <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path></svg>
                  `,cpu:`
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground lucide-cpu-icon lucide-cpu h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground"><path d="M12 20v2"></path><path d="M12 2v2"></path><path d="M17 20v2"></path><path d="M17 2v2"></path><path d="M2 12h2"></path><path d="M2 17h2"></path><path d="M2 7h2"></path><path d="M20 12h2"></path><path d="M20 17h2"></path><path d="M20 7h2"></path><path d="M7 20v2"></path><path d="M7 2v2"></path><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="8" y="8" width="8" height="8" rx="1"></rect></svg>
                  `,menu:`
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <line x1="3" y1="12" x2="21" y2="12"></line> <line x1="3" y1="6" x2="21" y2="6"></line> <line x1="3" y1="18" x2="21" y2="18"></line></svg>
                  `,edit:`
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 lucide-pen-icon lucide-pen h-4 w-4"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path></svg>
                  `,warning:`
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M12 9v4"></path> <path d="M12 17h.01"></path> <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path></svg>
                  `,danger:`
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-6 w-6 lucide-triangle-alert-icon lucide-triangle-alert h-6 w-6"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
                  `,success:`
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-5 w-5 shrink-0 lucide-circle-check-big-icon lucide-circle-check-big h-5 w-5 shrink-0"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
                  `,close:`
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 lucide-x-icon lucide-x h-4 w-4"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                  `,setting:`
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground lucide-settings-icon lucide-settings h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  `,wifi:`
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground lucide-wifi-icon lucide-wifi h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground"><path d="M12 20h.01"></path><path d="M2 8.82a15 15 0 0 1 20 0"></path><path d="M5 12.859a10 10 0 0 1 14 0"></path><path d="M8.5 16.429a5 5 0 0 1 7 0"></path></svg>
                  `,products:`
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground lucide-package-icon lucide-package h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><path d="m7.5 4.27 9 5.15"></path></svg>
                  `,reports:`
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground lucide-receipt-text-icon lucide-receipt-text h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"></path><path d="M14 8H8"></path><path d="M16 12H8"></path><path d="M13 16H8"></path></svg>
                  `,users:`
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground lucide-users-icon lucide-users h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>
                  `,user:`
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 text-primary-08-main lucide-user-icon lucide-user h-4 w-4 text-primary-08-main"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  `,pay:`
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground lucide-credit-card-icon lucide-credit-card h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>
                  `,wireless:`
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground lucide-radio-icon lucide-radio h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground"><path d="M16.247 7.761a6 6 0 0 1 0 8.478"></path><path d="M19.075 4.933a10 10 0 0 1 0 14.134"></path><path d="M4.925 19.067a10 10 0 0 1 0-14.134"></path><path d="M7.753 16.239a6 6 0 0 1 0-8.478"></path><circle cx="12" cy="12" r="2"></circle></svg>
                  `,logs:`
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground lucide-file-text-icon lucide-file-text h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
                  `,server:`
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground lucide-server-icon lucide-server h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect><rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect><line x1="6" x2="6.01" y1="6" y2="6"></line><line x1="6" x2="6.01" y1="18" y2="18"></line></svg>
                  `,exit:`
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 lucide-log-out-icon lucide-log-out h-4 w-4"><path d="m16 17 5-5-5-5"></path><path d="M21 12H9"></path><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path></svg>
                  `,refresh:`
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 lucide-refresh-cw-icon lucide-refresh-cw h-4 w-4"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M8 16H3v5"></path></svg>
                  `,download:`
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 lucide-download-icon lucide-download h-4 w-4"><path d="M12 15V3"></path><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="m7 10 5 5 5-5"></path></svg>
                  `,delete:`
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 lucide-trash2-icon lucide-trash-2 h-4 w-4"><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  `,key:`
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 lucide-key-icon lucide-key h-4 w-4"><path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"></path><path d="m21 2-9.6 9.6"></path><circle cx="7.5" cy="15.5" r="5.5"></circle></svg>
                  `,upload:`
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-6 w-6 text-neutral-07-caption-light lucide-upload-icon lucide-upload h-6 w-6 text-neutral-07-caption-light"><path d="M12 3v12"></path><path d="m17 8-5-5-5 5"></path><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path></svg>
                  `,location:`
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 text-primary-08-main lucide-map-pin-icon lucide-map-pin h-4 w-4 text-primary-08-main"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  `,debug:`
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-5 w-5 lucide-bug-icon lucide-bug h-5 w-5"><path d="m8 2 1.88 1.88"></path><path d="M14.12 3.88 16 2"></path><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"></path><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"></path><path d="M12 20v-9"></path><path d="M6.53 9C4.6 8.8 3 7.1 3 5"></path><path d="M6 13H2"></path><path d="M3 21c0-2.1 1.7-3.9 3.8-4"></path><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"></path><path d="M22 13h-4"></path><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"></path></svg>
                  `,layout:`
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 lucide-layout-dashboard-icon lucide-layout-dashboard h-4 w-4"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>
                  `,save:`
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 lucide-save-icon lucide-save h-4 w-4"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"></path><path d="M7 3v4a1 1 0 0 0 1 1h7"></path></svg>
                  `,eye:`
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="3" stroke="#33363F" stroke-width="2"></circle> <path d="M20.188 10.9343C20.5762 11.4056 20.7703 11.6412 20.7703 12C20.7703 12.3588 20.5762 12.5944 20.188 13.0657C18.7679 14.7899 15.6357 18 12 18C8.36427 18 5.23206 14.7899 3.81197 13.0657C3.42381 12.5944 3.22973 12.3588 3.22973 12C3.22973 11.6412 3.42381 11.4056 3.81197 10.9343C5.23206 9.21014 8.36427 6 12 6C15.6357 6 18.7679 9.21014 20.188 10.9343Z" stroke="#33363F" stroke-width="2"></path> </g></svg>
                  `,info:`
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.14939 7.8313C8.57654 5.92179 10.0064 4 12 4V4C13.9936 4 15.4235 5.92179 14.8506 7.8313L13.2873 13.0422C13.2171 13.2762 13.182 13.3932 13.128 13.4895C12.989 13.7371 12.7513 13.9139 12.4743 13.9759C12.3664 14 12.2443 14 12 14V14C11.7557 14 11.6336 14 11.5257 13.9759C11.2487 13.9139 11.011 13.7371 10.872 13.4895C10.818 13.3932 10.7829 13.2762 10.7127 13.0422L9.14939 7.8313Z" stroke="#33363F" stroke-width="2"></path> <circle cx="12" cy="19" r="2" stroke="#33363F" stroke-width="2"></circle> </g></svg>
                  `,box:`
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-package h-6 w-6" aria-hidden="true"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><path d="m7.5 4.27 9 5.15"></path></svg>
                  `,device:`
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-smartphone h-6 w-6" aria-hidden="true"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect><path d="M12 18h.01"></path></svg>
                  `,transactions:`
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart h-6 w-6" aria-hidden="true"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
                  `,trend_up:`
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-up h-6 w-6" aria-hidden="true"><path d="M16 7h6v6"></path><path d="m22 7-8.5 8.5-5-5L2 17"></path></svg>
                  `,add:`
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus h-4 w-4" aria-hidden="true"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                  `},ee=Promise.resolve();function y(e,t={}){let{size:n=22,className:r=``,stroke:i=2}=t,a=v[e];return a?(a=a.replace(/width=".*?"/,`width="${n}"`).replace(/height=".*?"/,`height="${n}"`).replace(/stroke-width=".*?"/,`stroke-width="${i}"`),r&&(a=a.replace(`<svg`,`<svg class="${r}"`)),a):``}function te(e=document){e.querySelectorAll(`[data-icon]`).forEach(e=>{e.outerHTML=y(e.getAttribute(`data-icon`),{size:e.getAttribute(`data-size`)||20,className:e.getAttribute(`data-class`)||``})})}function b(e){t.classList.toggle(`hidden`,!e)}function x(){let e=document.querySelector(`a[href="#/dev"]`);e&&e.classList.toggle(`hidden`,!0)}function S(){let e=document.getElementById(`mainNav`),t=document.getElementById(`overlay`);e.classList.toggle(`active`),t.classList.toggle(`active`)}window.addEventListener(`hashchange`,()=>{let e=document.getElementById(`mainNav`),t=document.getElementById(`overlay`);e.classList.remove(`active`),t.classList.remove(`active`)});function ne(e){(e?.currentTarget?.querySelector(`.user-dropdown`)).classList.toggle(`open`)}function re(){w({message:`آیا از ری‌استارت سیستم مطمئن هستید؟`,type:`reboot`,onConfirm:async()=>{let e=10;w({message:`
                              <div style="text-align:center">

                                  <div class="spinner" style="margin:10px auto;"></div>

                                  <div>
                                      سیستم در حال ری‌استارت است... <br>
                                      لطفاً صبر کنید.
                                  </div>

                                  <br>

                                  <div>
                                      راه‌اندازی مجدد تا
                                      <b id="rebootCounter">${e}</b>
                                      ثانیه دیگر انجام می‌شود
                                  </div>

                              </div>
                          `,type:`reboot`,showConfirm:!1});let t=setInterval(()=>{e--;let n=document.getElementById(`rebootCounter`);n&&(n.textContent=e),e<=0&&(clearInterval(t),location.reload())},1e3)}})}function C(e){let t=document.getElementById(e);document.querySelectorAll(`.drawer-content`).forEach(t=>{t.id!==e&&(t.style.display=`none`)}),t.style.display=t.style.display===`block`?`none`:`block`}function w({message:e=``,type:t=`info`,onConfirm:n=null,onCancel:r=null,showConfirm:i=!0,extraHtml:a=``}){let o={info:{color:`var(--info)`,icon:y(`info`)},noType:{color:``,icon:``},success:{color:`var(--success)`,icon:y(`success`)},warning:{color:`var(--warning)`,icon:y(`warning`)},danger:{color:`var(--danger)`,icon:y(`danger`)},reboot:{color:`var(--info)`,icon:y(`refresh`)}},s=o[t]||o.info,c=document.createElement(`div`);if(c.className=`app-modal`,c.innerHTML=`
              <div class="app-modal-box">

                  <div class="app-modal-header" style="color:${s.color}">
                      <span class="app-modal-icon">${s.icon}</span>
                  </div>

                  <div class="app-modal-message">
                      ${e}
                  </div>

                  ${a}

                  ${i?`
                      <div class="app-modal-actions">
                          <button class="btn modal-confirm"> تایید</button>
                          <button class="btn btn-outline modal-cancel">لغو</button>
                      </div>
                      `:``}

              </div>
              `,document.body.appendChild(c),i){let e=c.querySelector(`.modal-cancel`),t=c.querySelector(`.modal-confirm`);e.onclick=()=>{c.remove(),r&&r()},t.onclick=()=>{n&&n(c)}}}function T(e,t){return`
                      <p>
                      <strong>${e}:</strong>
                      <span>${t??` - `}</span>
                      </p>
                      `}function ie(e){document.querySelectorAll(`.nav-item`).forEach(t=>{t.classList.toggle(`active`,t.getAttribute(`href`)===e)})}function ae(e){document.querySelectorAll(`.notif-badge`).forEach(t=>{e>0?(t.textContent=e,t.classList.remove(`hidden`)):t.classList.add(`hidden`)})}async function E(e,t=`GET`,n=null){let r={method:t,headers:{Authorization:`Bearer `+localStorage.getItem(`rm_token`)}};n&&(r.headers[`Content-Type`]=`application/json`,r.body=JSON.stringify(n));try{let t=await fetch(e,r);if(t.status===401){D(`error`,`401`,`دسترسی غیر مجاز ❌`),setTimeout(()=>{O()},1e3);return}if(t.status&&t.status>=500&&t.status<600){let e=Error(`خطای سرور. لطفاً کمی بعد دوباره تلاش کنید.`);throw e.isServerError=!0,e.statusCode=t.status,e}return await t.json()}catch(e){return e.isServerError?D(`error`,`${e.statusCode}`,e.message):D(`error`,`خطا`,`خطایی رخ داد. اتصال اینترنت خود را بررسی کنید.`),{}}}function D(e=`info`,t=`اعلان`,n=``,r=5e3){let i=document.getElementById(`toastStack`);i||(i=document.createElement(`div`),i.id=`toastStack`,i.style.cssText=`
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 9999;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
                pointer-events: none;
            `,document.body.appendChild(i));let a=document.createElement(`div`);a.className=`toast toast-${e}`,a.style.cssText=`
            min-width: 280px;
            max-width: 90vw;
            background: #fff;
            color: #222;
            border-radius: 14px;
            box-shadow: 0 10px 30px rgba(0,0,0,.15);
            padding: 14px 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            pointer-events: auto;
            transition: transform .25s ease, opacity .25s ease;
            touch-action: pan-y;
            border-right: 4px solid #3b82f6;
        `;let o={success:`#22c55e`,error:`#ef4444`,warning:`#f59e0b`,info:`#3b82f6`};a.style.borderRightColor=o[e]||o.info,a.innerHTML=`
            <div class="toast-content">
                <div class="toast-title">${t}</div>
                <div class="toast-message" >${n}</div>
            </div>
            <button class="toast-close" aria-label="close" >✕</button>
        `;let s=!1,c=0,l=0,u=!1,d=()=>{s||(s=!0,a.style.opacity=`0`,a.style.transform=`translateY(-10px) scale(.96)`,setTimeout(()=>a.remove(),250))},f=e=>{s||(s=!0,a.style.opacity=`0`,a.style.transform=`translateX(${e>0?120:-120}px)`,setTimeout(()=>a.remove(),250))};a.querySelector(`.toast-close`).addEventListener(`click`,d),a.addEventListener(`touchstart`,e=>{c=e.touches[0].clientX,l=c,u=!0,a.style.transition=`none`}),a.addEventListener(`touchmove`,e=>{if(!u)return;l=e.touches[0].clientX;let t=l-c;a.style.transform=`translateX(${t}px)`,a.style.opacity=`${Math.max(.4,1-Math.abs(t)/200)}`}),a.addEventListener(`touchend`,()=>{if(!u)return;u=!1;let e=l-c;a.style.transition=`transform .25s ease, opacity .25s ease`,Math.abs(e)>80?f(e):(a.style.transform=`translateX(0)`,a.style.opacity=`1`)}),i.appendChild(a),r>0&&setTimeout(d,r)}function O(){localStorage.removeItem(`rm_token`),localStorage.removeItem(`rm_user`),window.location.href=`index.html`}document.addEventListener(`DOMContentLoaded`,()=>{te()}),x(),window.addEventListener(`hashchange`,k),window.addEventListener(`load`,k);async function k(){await ee;let e=location.hash||`#/`;if(e!==n){if(n=e,!localStorage.getItem(`rm_token`)){window.location.href=`index.html`;return}switch(ae(25),ie(e),r&&=(r.close(),null),e){case`#/`:await F();break;case`#/notifications`:B();break;case`#/prices`:await J();break;case`#/clients`:await H();break;case`#/balance`:await W();break;case`#/settings`:await ge();break;case`#/factory`:await Pe();break;case`#/logs`:ze();break;case`#/info`:await ke();break;case`#/service-configuration`:await X();break;case`#/dev`:$(404);break;default:$(404)}}}function A(e){return new Intl.NumberFormat(`fa-IR`).format(Number(e)||0)}function j(e){return e==null||e===``?`--`:e}function oe(e,t){switch(e){case`day`:return Math.max(1,Math.ceil(t/6));case`week`:return 1;case`month`:return 5;case`year`:return 1;default:return 1}}function se(e=`week`){let t=(a.sales_chart||{})[e];if(!t)return null;let n=Array.isArray(t.series)&&t.series[0]||{};return{period:t.period,currency:t.currency||`IRR`,labels:t.labels||[],series:[{key:`sales`,data:n.sales||[]},{key:`transactions`,data:n.transactions||[]}],meta:{from:t.meta?.from??`--`,to:t.meta?.to??`--`,total_sales:t.meta?.total_sales??0,total_transactions:t.meta?.total_transactions??0}}}function ce(e){return e===`24h`?`۲۴ ساعت گذشته`:e===`7d`?`۷ روز گذشته`:e===`31d`?`ماه جاری`:e===`12m`?`۱۲ ماه گذشته`:`--`}function le(e,t){if(!e||!t)return;let n=t.labels||[],r=oe(i,n.length),a=(t.series||[]).find(e=>e.key===`sales`)?.data||[],o=(t.series||[]).find(e=>e.key===`transactions`)?.data||[];if(!a.length){e.innerHTML=`<div class="empty-state">داده‌ای برای نمایش نمودار وجود ندارد</div>`;return}let s=Math.max(...a,1),c=Math.max(s-0,1),l=n.length>1?96/(n.length-1):0,u=a.map((e,t)=>({x:2+t*l,y:38-(e-0)/c*34,sales:Number(e||0),transactions:Number(o[t]||0),label:n[t]||`--`})),d=u.map(e=>`${e.x},${e.y.toFixed(2)}`).join(` `),f=(()=>{let e=2+l*(a.length-1),t=`M 2 38 `;t+=`L ${u[0].x} ${u[0].y} `;for(let e=1;e<u.length;e++)t+=`L ${u[e].x} ${u[e].y} `;return t+=`L ${e} 38 Z`,t})(),p=`#0ea5e9`,m=`salesGradient-${Math.random().toString(36).slice(2,8)}`;e.innerHTML=`
                <div class="sales-trend-header">
                    <div>
                        <h3>نمودار فروش</h3>
                        <small>${ce(t.period)}</small>
                    </div>

                    <div class="sales-trend-switch">
                        <button type="button" class="btn btn-soft ${i===`day`?`is-active`:``}" data-period="day">
                            روز
                        </button>
                        <button type="button" class="btn btn-soft ${i===`week`?`is-active`:``}" data-period="week">
                            هفته
                        </button>
                        <button type="button" class="btn btn-soft ${i===`month`?`is-active`:``}" data-period="month">
                            ماه
                        </button>
                        <button type="button" class="btn btn-soft ${i===`year`?`is-active`:``}" data-period="year">
                            سال
                        </button>
                    </div>
                </div>

                <div class="sales-trend-chart">
                    <div class="sales-trend-tooltip"></div>

                    <svg class="sales-trend-svg" viewBox="0 0 100 42" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="${m}" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stop-color="${p}" stop-opacity="0.25" />
                                <stop offset="100%" stop-color="${p}" stop-opacity="0.02" />
                            </linearGradient>
                        </defs>

                        <path d="${f}" fill="url(#${m})" stroke="none"></path>

                        <polyline
                            points="${d}"
                            fill="none"
                            stroke="${p}"
                            stroke-width="0.3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></polyline>

                        ${u.map(e=>`
                                    <g
                                        class="chart-point-group"
                                        data-label="${j(e.label)}"
                                        data-sales="${e.sales}"
                                        data-transactions="${e.transactions}"
                                    >
                                        <circle cx="${e.x}" cy="${e.y}" r="0.6" fill="${p}"></circle>
                                        <circle cx="${e.x}" cy="${e.y}" r="2" fill="transparent"></circle>
                                    </g>
                                `).join(``)}
                    </svg>
                </div>

                 <div class="sales-trend-labels" style="--label-count: ${n.length};">
                        ${n.map((e,t)=>{let i=t===n.length-1;return`
                                    <span class="${t%r===0||i?``:`is-hidden`}">
                                        ${j(e)}
                                    </span>
                                `}).join(``)}
                    </div>


                <div class="sales-trend-meta">
                    <div><strong>${A(t.meta?.total_sales||0)}</strong><span>مجموع فروش</span></div>
                    <div><strong>${A(t.meta?.total_transactions||0)}</strong><span>تراکنش</span></div>
                    <div><strong>${j(t.currency)}</strong><span>واحد</span></div>
                  <div>
                        <span>
                            <strong>${j(M(t.meta?.from,!1)||`--`)}</strong>
                            <span style="margin: 0 4px;">تا</span>
                            <strong>${j(M(t.meta?.to,!1)||`--`)}</strong>
                        </span>
                    </div>
                </div>
            `,e.querySelectorAll(`[data-period]`).forEach(e=>{e.addEventListener(`click`,()=>{i=e.dataset.period,F()})});let h=e.querySelector(`.sales-trend-chart`),g=e.querySelector(`.sales-trend-tooltip`);e.querySelectorAll(`.chart-point-group`).forEach(e=>{e.addEventListener(`mouseenter`,()=>{let t=e.dataset.label||`--`,n=A(Number(e.dataset.sales||0)),r=A(Number(e.dataset.transactions||0));g.innerHTML=`
                        <div><strong>${t}</strong></div>
                        <div>فروش: ${n}</div>
                        <div>تراکنش: ${r}</div>
                    `,g.style.display=`block`}),e.addEventListener(`mousemove`,e=>{let t=h.getBoundingClientRect(),n=e.clientX-t.left,r=e.clientY-t.top;g.style.left=`${n+12}px`,g.style.top=`${r-12}px`}),e.addEventListener(`mouseleave`,()=>{g.style.display=`none`})})}function M(e,t=!0){if(!e)return`--`;let n=new Date(e);if(Number.isNaN(n.getTime()))return e;let r={year:`numeric`,month:`2-digit`,day:`2-digit`};return t&&(r.hour=`2-digit`,r.minute=`2-digit`),new Intl.DateTimeFormat(`fa-IR`,r).format(n)}function ue(e={}){if(!e)return;let t=e.today||{},n=e.speaker||{},r=e.last_sale||{},i=e.most_sold||{},a=e.device?.wifi||{},o=e.device?.info||{},s=Array.isArray(e.latest_activity)?e.latest_activity:[],c=Array.isArray(e.warnings)?e.warnings:[],l=Array.isArray(e.notifications)?e.notifications:[];return{today_sales:t.sales??0,today_transactions:t.transactions??0,active_products:t.active_products??0,device_status:o.status,device_model:o?.model,device_uptime:o?.uptime??0,wifi:{rssi:a.rssi??``,ssid:a.ssid??``,connected:a.connected??``},board_version:`--`,last_operation:{title:s[0]?.title??`--`,time:M(s[0]?.time),status:s[0]?.status??`--`},speaker:{volume:n.volume??75,muted:n.muted??!1},last_sale:{product:r.product??`--`,price:r.price??0,channel:r.channel??`--`,customer:r.customer??`--`,payment_method:r.payment_method??`--`,time:M(r.time)},most_sold:{today:{name:i.today?.name??`--`,count:i.today?.count??0},week:{name:i.week?.name??`--`,count:i.week?.count??0},month:{name:i.month?.name??`--`,count:i.month?.count??0}},warnings:c.map(e=>({title:e.title??`--`,message:e.message??`--`,status:e.status??`--`,time:M(e.time)})),notifications:l.map(e=>({title:e.title??`--`,message:e.message??`--`,status:e.status??`--`,time:M(e.time)})),latest_activity:s.map(e=>({title:e.title??`--`,description:e.description??`--`,status:e.status??`--`,time:M(e.time)})),sales_chart:e.sales_chart||{}}}var N=e=>e===`success`||e===`online`?`status-on`:e===`warning`?`status-warn`:e===`info`?`status-info`:`status-off`,P=e=>e===`wallet`?`کیف پول`:e===`cash`?`نقدی`:e===`card`?`کارت`:j(e);async function F(){b(!0),u=await E(`/api/dashboard`)||{},b(!1),a=u;let t=ue(u),n=e=>j(e===`success`?`موفق`:e===`online`?`فعال`:e===`warning`?`هشدار`:e===`info`?`اطلاع`:e===`error`?`خطا`:e),r=L(),o=t.wifi||{},s=t.last_operation||{},c=se(i);function l(e){let t=String(e??``).toLowerCase();return[`success`,`online`,`active`,`connected`,`ok`,`true`].includes(t)?{cls:`connected`,label:`فعال`}:[`warning`,`info`,`connecting`,`pending`,`unknown`].includes(t)?{cls:`warning`,label:`هشدار`}:[`error`,`offline`,`fail`,`failed`,`disconnected`,`down`,`false`].includes(t)?{cls:`disconnected`,label:`قطع`}:{cls:`warning`,label:j(e)}}let d=l(t?.device_status),f=o.connected===!0?{cls:`connected`,label:`متصل`}:o.connected===!1?{cls:`disconnected`,label:`قطع`}:{cls:`warning`,label:`نامشخص`};e.innerHTML=`
                      <div class="dashboard-container">

                      <div class="dashboard-compact">
                          <div class="dashboard-header">
                              <div class="dashboard-greeting">
                                  <div class="greeting-icon">👋</div>
                                  <div>
                                      <h2>سلام حامد</h2>
                                      <span>نمای کلی همه دستگاه‌ها</span>
                                  </div>
                              </div>

                  


                              <div class="dashboard-date">
                                  <div class="time-jalali">${j(r.jalali)}</div>
                                     <div class="top-bar">
                                          <button class="btn-download" onclick='downloadReport(${JSON.stringify(t)})'>
                                              ${y(`download`)}
                                              گزارش فروش
                                          </button>
                                      </div>
                              </div>
                          </div>

                          <div class="mini-grid">
                                <div class="mini-card ${d.cls}">
                                    <div class="mini-icon">${y(`server`)}</div>
                                    <div>
                                        <span>سیستم</span>
                                        <strong><small>${d.label}</small></strong>
                                    </div>
                                </div>

                                <div class="mini-card ${f.cls}">
                                    <div class="mini-icon">${y(`wifi`)}</div>
                                    <div>
                                        <span>WiFi ${o.ssid?`(${j(o.ssid)})`:``}</span>
                                        <strong>
                                            <small>
                                                ${j(o.rssi)}${o.rssi==null?``:` dBm`}
                                                ${o.connected===``?``:` · ${f.label}`}
                                            </small>
                                        </strong>
                                    </div>
                                </div>

                                <div class="mini-card ${d.cls}">
                                    <div class="mini-icon">${y(`setting`)}</div>
                                    <div>
                                        <span>Board</span>
                                        <strong><small>v${j(t.device_model)}</small></strong>
                                    </div>
                                </div>
                            </div>

                      </div>

                          <div class="dashboard-compact">


                             <div class="metric-grid">

                                    <div class="metric-card">
                                        <div class="metric-icon">
                                            ${y(`box`)}
                                        </div>

                                        <div class="metric-content">
                                            <span class="metric-title">محصولات فعال</span>
                                            <strong class="metric-value">${A(t.active_products??0)}</strong>
                                            <small class="metric-desc">در کل شبکه</small>
                                        </div>
                                    </div>

                                    <div class="metric-card">
                                        <div class="metric-icon">
                                            ${y(`device`)}
                                        </div>

                                        <div class="metric-content">
                                            <span class="metric-title">زمان آپتایم</span>
                                            <strong class="metric-value">${j(t.device_uptime)}</strong>
                                        </div>
                                    </div>

                                    <div class="metric-card">
                                        <div class="metric-icon">
                                            ${y(`transactions`)}
                                        </div>

                                        <div class="metric-content">
                                            <span class="metric-title">تراکنش‌ها</span>
                                            <strong class="metric-value">${A(t.today_transactions??0)}</strong>
                                            <small class="metric-desc">موفق امروز</small>
                                        </div>
                                    </div>

                                    <div class="metric-card">
                                        <div class="metric-icon">
                                            ${y(`trend_up`)}
                                        </div>

                                        <div class="metric-content">
                                            <span class="metric-title">فروش امروز</span>
                                            <strong class="metric-value">
                                                ${A(t.today_sales??0)} تومان
                                            </strong>
                                        </div>
                                    </div>

                           </div>


                                <div class="compact-card">
                                  <div class="section-title">
                                      <span>Volume</span>
                                      <small>Sound</small>
                                  </div>

                                  <div class="volume-box">
                                      <input
                                          type="range"
                                          min="0"
                                          max="100"
                                          step="25"
                                          value="${j(t.speaker?.volume??75)}"
                                          id="volumeSlider"
                                          oninput="setVolume(this.value)"
                                      >
                                     <span id="volumeValue">${j(t.speaker?.volume??75)}%</span>


                                  </div>
                              </div>

                            ${c?` <div class="compact-card sales-trend-card">
                                                                    <div id="salesTrendChart"></div>
                                                                    </div>`:``}

                                <div class="compact-card">
                                    <div class="section-title">
                                        <span>آخرین فروش</span>
                                        <small>Last Sale</small>
                                    </div>

                                    ${j(t.last_sale.product)===`--`?`<div class="empty-state">دیتایی وجود ندارد</div>`:`
                                                                    <div class="info-list">
                                                                        <div><strong>محصول:</strong> <span>${j(t.last_sale.product)}</span></div>
                                                                        <div><strong>قیمت:</strong> <span>${A(t.last_sale.price)} تومان</span></div>
                                                                        <div><strong>کانال:</strong> <span>${j(t.last_sale.channel)}</span></div>
                                                                        <div><strong>مشتری:</strong> <span>${j(t.last_sale.customer)}</span></div>
                                                                        <div><strong>پرداخت:</strong> <span>${P(t.last_sale.payment_method)}</span></div>
                                                                        <div><strong>زمان:</strong> <span>${j(t.last_sale.time)}</span></div>
                                                                    </div>
                                                                `}
                                </div>


                                <div class="compact-card">
                                    <div class="section-title">
                                        <span>پرفروش‌ترین‌ها</span>
                                        <small>Most Sold</small>
                                    </div>

                                    ${j(t.last_sale.product)===`--`?`<div class="empty-state">دیتایی وجود ندارد</div>`:` <div class="info-list">
                                        <div><strong>امروز:</strong> <span>${j(t.most_sold.today.name)} - ${A(t.most_sold.today.count)}</span></div>
                                        <div><strong>این هفته:</strong> <span>${j(t.most_sold.week.name)} - ${A(t.most_sold.week.count)}</span></div>
                                        <div><strong>این ماه:</strong> <span>${j(t.most_sold.month.name)} - ${A(t.most_sold.month.count)}</span></div>
                                    </div>`}
                                </div>


                                <div class="compact-card">
                                    <div class="section-title">
                                        <span>اعلان‌ها</span>
                                        <small>Notifications</small>
                                    </div>

                                    <div class="activity-list">
                                        ${t.notifications.length?t.notifications.map(e=>`
                                                <div class="activity-item">
                                                    <div>
                                                        <strong>${j(e.title)}</strong>
                                                        <span>${j(e.message)}</span>
                                                        <small>${j(e.time)}</small>
                                                    </div>
                                                    <span class="status-badge ${N(e.status)}">
                                                        ${n(e.status)}
                                                    </span>
                                                </div>
                                            `).join(``):`<div class="empty-state">دیتایی وجود ندارد</div>`}
                                    </div>
                                </div>


                         </div>


                          <div class="dashboard-compact">

                              <div class="compact-card">
                                  <div class="section-title">
                                      <span>آخرین عملیات</span>
                                      <small>Result</small>
                                  </div>

                                   ${s.status===`--`?`<div class="empty-state">دیتایی وجود ندارد</div>`:`<div class="last-operation">
                                        <div>
                                            <strong>${j(s.title)}</strong>
                                            <span>${j(s.time)}</span>
                                        </div>

                                        <span class="status-badge ${N(s.status)}">
                                                              ${n(s.status)}
                                                          </span>
                                    </div>`}
                              </div>


                              <div class="compact-card">
                                <div class="section-title">
                                    <span>فعالیت‌های اخیر</span>
                                    <small>Latest Activity</small>
                                </div>

                                <div class="activity-list">
                                    ${t.latest_activity.length?t.latest_activity.map(e=>`
                                            <div class="activity-item">
                                                <div>
                                                    <strong>${j(e.title)}</strong>
                                                    <span>${j(e.description)}</span>
                                                    <small>${j(e.time)}</small>
                                                </div>
                                                <span class="status-badge ${N(e.status)}">
                                                    ${n(e.status)}
                                                </span>
                                            </div>
                                        `).join(``):`<div class="empty-state">دیتایی وجود ندارد</div>`}
                                </div>
                            </div>


                                <div class="compact-card">
                                    <div class="section-title">
                                        <span>هشدارها</span>
                                        <small>Warnings</small>
                                    </div>

                                    <div class="activity-list">
                                        ${t.warnings.length?t.warnings.map(e=>`
                                                <div class="activity-item">
                                                    <div>
                                                        <strong>${j(e.title)}</strong>
                                                        <span>${j(e.message)}</span>
                                                        <small>${j(e.time)}</small>
                                                    </div>
                                                    <span class="status-badge ${N(e.status)}">
                                                        ${n(e.status)}
                                                    </span>
                                                </div>
                                            `).join(``):`<div class="empty-state">دیتایی وجود ندارد</div>`}
                                    </div>
                                </div>


                          </div>
                      </div>
                  `,le(document.getElementById(`salesTrendChart`),c),R()}function I(e){document.getElementById(`volumeValue`).innerText=e+`%`,clearTimeout(o),o=setTimeout(async()=>{await E(`/api/device/volume`,`POST`,{volume:e})},1e3)}function L(){let e=new Date,t=new Intl.DateTimeFormat(`en-GB`,{weekday:`short`,year:`numeric`,month:`2-digit`,day:`2-digit`}).format(e),n=new Intl.DateTimeFormat(`en-GB`,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hour12:!1}).format(e),r=new Intl.DateTimeFormat(`fa-IR-u-ca-persian`,{weekday:`long`,year:`numeric`,month:`long`,day:`numeric`}).format(e),i=new Intl.DateTimeFormat(`fa-IR-u-ca-persian`,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hour12:!1}).format(e);return{gregorian:`${t} | ${n}`,jalali:`${r} | ${i}`}}function R(){function e(){let e=L(),t=document.querySelector(`.time-greg`),n=document.querySelector(`.time-jalali`);t&&(t.textContent=e.gregorian),n&&(n.textContent=e.jalali)}e(),setInterval(e,3e3)}function z(e){D(`warning`,`توجه`,`این بخش در حال توسعه میباشد 👽`)}function B(){e.innerHTML=`
                      <div class="card">
                         <div class="notifications-header">
                           <div style="display: flex; align-items: center; justify-content: start; gap: 10px">
                              ${y(`bell`)}
                              <h2>اعلانات</h2>
                          </div>
                              <button class="btn btn-soft" onclick="markNotificationsRead()">خوانده شد ✓</button>
                         </div>

                      </div>

                      <div class="notifications-page" id="notificationsList">
                          <div class="notification-item">
                              <div class="notification-dot"></div>
                              <div>
                                  <strong>سفارش جدید ثبت شد</strong>
                                  <p style="margin:6px 0 0;color:var(--text-soft)">یک سفارش جدید از دستگاه ۱۲۳ ثبت شده است.</p>
                                  <small style="color:var(--text-placeholder)">۵ دقیقه پیش</small>
                              </div>
                          </div>

                          <div class="notification-item">
                              <div class="notification-dot" style="background:var(--warning)"></div>
                              <div>
                                  <strong>موجودی کم</strong>
                                  <p style="margin:6px 0 0;color:var(--text-soft)">محصول "چیپس" در حال نزدیک شدن به اتمام است.</p>
                                  <small style="color:var(--text-placeholder)">۳۰ دقیقه پیش</small>
                              </div>
                          </div>

                          <div class="notification-item">
                              <div class="notification-dot" style="background:var(--info)"></div>
                              <div>
                                  <strong>بروزرسانی سیستم</strong>
                                  <p style="margin:6px 0 0;color:var(--text-soft)">نسخه جدید پنل مدیریت منتشر شد.</p>
                                  <small style="color:var(--text-placeholder)">۲ ساعت پیش</small>
                              </div>
                          </div>
                      </div>
                  `}function V(){D(`success`,``,`وضعیت همه پیام ها به خوانده شد تغییر کرد`,3e3)}async function H(){b(!0),f=await E(`/api/clients`),b(!1),e.innerHTML=`
                  <div class="card" style="padding-bottom: 80px">

                      <div style="display: flex; align-items: center; justify-content: start; gap: 10px">
                          ${y(`users`)}
                          <h2>مدیریت کاربران</h2>
                     </div>

                      <div class="table-responsive">
                          <table>
                              <thead>
                                  <tr>
                                      <th class="col-index">#</th>
                                      <th class="col-name">نام</th>
                                      <th class="col-id">ID</th>
                                      <th class="col-status">وضعیت</th>
                                      <th class="col-settings">عملیات</th>
                                  </tr>
                              </thead>
                              <tbody id="clientsTable"></tbody>
                          </table>
                      </div>

                  </div>

                  <div class="page-action-bar">
                     <button class="btn" onclick="addNewClient()">${y(`add`)}افزودن کاربر جدید</button>
                      <button class="btn btn-outline" onclick="location.hash='#/'">بازگشت</button>
                  </div>
                  `;let t=document.getElementById(`clientsTable`),n=0;for(let e in f){let r=f[e],i=!!r.disabledByServer,a=!!r.error,o=r.status===`فعال`,s=document.createElement(`tr`);o||s.classList.add(`row-inactive`),a&&s.classList.add(`row-error`),n++,s.innerHTML=`
                              <td class="col-index">
                                  <span class="channel-badge ${a?`channel-badge-error`:``}">
                                      ${n}
                                  </span>
                              </td>

                              <td class="col-name">
                                  <input
                                      class="input-display"
                                      type="text"
                                      value="${r.name||`---`}"
                                      readonly
                                      tabindex="-1"
                                  >
                              </td>

                              <td class="col-id">
                                  <span>
                                      ${r.id||`--`}
                                  </span>
                              </td>

                              <td class="col-status">
                                  <span class="badge ${o?`badge-active`:`badge-inactive`}">
                                      ${o?`فعال`:`غیر فعال`}
                                  </span>
                              </td>

                              <td class="col-settings">
                                  <button
                                      class="btn-manage"
                                      onclick="openClientsAdvancedSettings('${e}')"
                                      ${i?`disabled`:``}
                                  >
                                      ${y(a?`warning`:`setting`)}
                                  </button>
                              </td>
                          `,t?.appendChild(s)}}function U(e){let t=f[e];if(!t)return;let n=t.name||``,r=t.id||``,i=t.status===`فعال`,a=t.error||``,o=t.disabledByServer||``;w({message:`
                  <div class="adv-modal">
                      <div class="modal-product-icon">
                      ${y(`users`)}
                      </div>

                      <p style="text-align: center; margin-bottom: 10px;">
                         ویرایش کاربر ${n||r}
                      </p>

                      <div class="input-group">
                          <label>ویرایش نام</label>
                          <input type="text" id="modalName" placeholder="نام کاربر" value="${n}" class="input-text">
                      </div>

                      <div class="input-group">
                            <label>ویرایش ایدی</label>
                            <input
                                type="number"
                                id="modalId"
                                placeholder="ایدی کاربر"
                                value="${r}"
                                class="input-text"
                                min="0"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                            >
                        </div>

                      <div  class="input-group">
                          <div class="toggle-row">
                              <span>وضعیت کاربر</span>
                              <label class="switch">
                                <input
                                    type="checkbox"
                                    id="modalVisible"
                                    ${i?`checked`:``}
                                    ${a?`disabled`:``}
                                >
                                <span class="slider"></span>
                              </label>
                          </div>
                      </div>

                      <div class="input-group">
                          <button
                              type="button"
                              class="btn-danger"
                              style="width: 100%"
                              onclick="deleteClient('${e}')"
                              ${o?`disabled`:``}
                          >
                              حذف کاربر
                          </button>
                      </div>
                  </div>
              `,type:`noType`,onConfirm:async t=>{let n={id:document.getElementById(`modalId`).value.trim(),name:document.getElementById(`modalName`).value.trim(),status:document.getElementById(`modalVisible`).checked?`فعال`:`غیر فعال`};f[e]={...f[e],...n};try{await H(),t.remove();return}catch{D(`error`,`خطا`,`ذخیره تغییرات با خطا مواجه شد ❌`)}await H(),t.remove()}})}async function de(e){let t=f[e];t&&w({message:`آیا از حذف کاربر «${t.name||t.id||``}» مطمئن هستید؟`,type:`danger`,onConfirm:async t=>{try{delete f[e],await H(),t.remove(),D(`success`,`حذف`,`حذف کاربر با موفقیت انجام شد ✅`),location.reload()}catch{D(`error`,`خطا`,`حذف کاربر با خطا مواجه شد ❌`)}}})}async function fe(){w({message:`
                  <div class="adv-modal">
                      <div class="modal-product-icon">
                      ${y(`users`)}
                      </div>

                      <p style="text-align: center; margin-bottom: 10px;">
                         افزودن کاربر جدید
                      </p>

                      <div class="input-group">
                          <label>نام</label>
                          <input type="text" id="modalName" placeholder="نام کاربر" value="" class="input-text">
                      </div>

                      <div class="input-group">
                          <label>ایدی</label>
                          <input type="text" id="modalId" placeholder="ایدی کاربر" value="" class="input-text">
                      </div>

                      <div class="input-group">
                          <div class="toggle-row">
                              <span>وضعیت کاربر</span>
                              <label class="switch">
                                <input type="checkbox" id="modalVisible" checked>
                                <span class="slider"></span>
                              </label>
                          </div>
                      </div>
                  </div>
              `,type:`noType`,onConfirm:async e=>{let t=document.getElementById(`modalName`).value.trim(),n=document.getElementById(`modalId`).value.trim(),r=document.getElementById(`modalVisible`).checked?`فعال`:`غیر فعال`;if(!t||!n){D(`error`,`خطا`,`نام و ایدی نمی‌توانند خالی باشند ❌`);return}let i={name:t,id:n,status:r};try{let t=n;f[t]=i,await H(),e.remove()}catch{D(`error`,`خطا`,`افزودن کاربر با خطا مواجه شد ❌`)}}})}async function W(){b(!0),p=await E(`/api/balance`),b(!1);let t=p,n=``;t.forEach((e,t)=>{n+=`
                      <tr>
                          <td>${t+1}</td>
                          <td>${e.name}</td>
                          <td id="clientId${t}">${e.id}</td>

                          <td>
                              <input
                                  type="number"
                                  step="100000"
                                  id="balance${t}"
                                  value="${e.balance}"
                              >
                          </td>

                      </tr>
                      `}),e.innerHTML=`
                              <div class="card">

                              <div style="display: flex; align-items: center; justify-content: start; gap: 10px">
                                    ${y(`pay`)}
                                    <h2>مدیریت موجودی مشتریان</h2>
                              </div>

                                <table id="balanceTable">
                                  <thead>
                                    <tr>
                                      <th class="col-index">#</th>
                                      <th class="col-name">نام</th>
                                      <th class="col-id">ID</th>
                                      <th class="col-price">موجودی</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    ${n}
                                  </tbody>
                                </table>
                              </div>

                            <div class="page-action-bar">
                                  <div class="action-group">
                                      <input type="number" step="1000000" id="globalBalanceInput" placeholder="موجودی برای همه">
                                      <button class="btn" onclick="applyBalanceToAll(${t.length})">
                                          اعمال به همه
                                      </button>
                                  </div>

                                  <div class="action-group">
                                      <button class="btn" onclick="confirmSave(${t.length})">
                                          ذخیره تغییرات
                                      </button>
                                      <button class="btn btn-outline" onclick="downloadBalanceCSV()">
                                          دانلود CSV
                                      </button>
                                  </div>
                              </div>
                  `}function pe(e){let t=document.getElementById(`globalBalanceInput`).value;if(t===``){D(`warning`,`توجه`,`اول مقدار وارد کن!`);return}for(let n=0;n<e;n++){let e=document.getElementById(`balance`+n);e&&(e.value=t)}}async function G(e){let t=[];for(let n=0;n<e;n++){let e=document.getElementById(`balance`+n),r=document.getElementById(`clientId`+n);e&&r&&t.push({id:r.innerText.trim(),newBalance:Number(e.value)})}b(!0);let n=await E(`/api/balance`,`POST`,t);b(!1),n?.success?(D(`success`,`موفق`,`اطلاعات با موفقیت ذخیره شد`,7e3),await W()):D(`error`,`خطا`,`خطا در برقراری ارتباط با سرور`,4e3)}function me(e){w({message:`آیا مطمئن هستید که می‌خواهید تغییرات موجودی ذخیره شود؟`,type:`warning`,onConfirm:async t=>{await G(e),t.remove()}})}async function he(){D(`info`,`درحال توسعه`,`این بخش در حال توسعه میباشد ...`)}async function ge(){b(!0),m=await E(`/api/settings`)||{},b(!1);let t=new Date,n=t.toISOString().split(`T`)[0],r=t.toTimeString().slice(0,5);e.innerHTML=`
                      <div class="card" style="padding-bottom: 60px">
                          <div>
                              <div style="display: flex; align-items: center; justify-content: start; gap: 10px;">
                                  ${y(`setting`)}
                                  <h2>تنظیمات دستگاه</h2>
                              </div>
                          </div>

                          <form id="settingsForm" onsubmit="saveSettings(event)">

                              <!-- WiFi Settings -->
                              <div class="drawer">
                                  <div class="drawer-summary" onclick="toggleDrawer('wifi')">
                                    <div style="display: flex; align-items: center; justify-content: start; gap: 10px;">
                                          ${y(`wireless`)}
                                          <div>تنظیمات شبکه</div>
                                      </div>
                                  </div>

                                  <div class="drawer-content" id="wifi" style="display:none">

                                      <div class="grid">

                                          <!-- hidden input برای submit فرم -->
                                          <input type="hidden" name="wifiSSID" id="wifiSSID">

                                          <div class="compact-card wifi-section">

                                              <div class="section-title">
                                                  <span>انتخاب شبکه WiFi</span>
                                                  <div style="display: flex; gap: 10px">
                                                      <button type="button" class="btn btn-outline" style="width: 40px" onClick="addWifi()">
                                                          ${y(`add`)}
                                                      </button>
                                                       <button type="button" class="btn btn-outline" style="width: 40px" onClick="loadWifiList()">
                                                          ${y(`refresh`)}
                                                      </button>
                                                  </div>
                                              </div>

                                              <div id="wifiList" class="wifi-list">
                                                  در حال اسکن...
                                              </div>

                                          </div>


                                              <div class="compact-card">
                                                   <div class="form-group">
                                                     <label>نقطه اتصال دستگاه (AP)</label>
                                                     <input  type="text" name="apSSID" value="${m.apSSID||``}" placeholder="نام نقطه اتصال دستگاه را وارد کنید">
                                                   </div>

                                                   <div class="form-group">
                                                      <label>رمز عبور جدید (حداقل ۸ کاراکتر)</label>

                                                        <div style="display:flex;gap:6px">

                                                              <button
                                                                  type="button"
                                                                  class="btn btn-outline"
                                                                  style="width: 44px"
                                                                onclick="toggleInputVisibility('APwifiPassword')"
                                                              >
                                                                  ${y(`eye`)}
                                                              </button>

                                                              <input
                                                                   dir="ltr"
                                                                   type="password"
                                                                   id="APwifiPassword"
                                                                   name="apPassword"
                                                                   placeholder="رمز عبور جدید را وارد کنید"
                                                                   style="flex:1"
                                                              >

                                                          </div>

                                                   </div>

                                                     <div class="form-group">
                                                      <label>تایید رمز عبور جدید (حداقل ۸ کاراکتر)</label>

                                                          <div style="display:flex;gap:6px">

                                                              <button
                                                                  type="button"
                                                                  class="btn btn-outline"
                                                                  style="width: 44px"
                                                                onclick="toggleInputVisibility('APConfwifiPassword')"
                                                              >
                                                                  ${y(`eye`)}
                                                              </button>

                                                              <input
                                                                   dir="ltr"
                                                                   type="password"
                                                                   name="confPassword"
                                                                   placeholder="تکرار رمز عبور جدید را وارد کنید"
                                                                   id="APConfwifiPassword"
                                                                   style="flex:1"
                                                              >

                                                          </div>

                                                   </div>
                                              </div>


                                      </div>

                                  </div>

                              </div>

                              <!-- Admin Credentials -->
                              <div class="drawer">
                                  <div class="drawer-summary" onclick="toggleDrawer('admin')">
                                       <div style="display: flex; align-items: center; justify-content: start; gap: 10px;">
                                          ${y(`users`)}
                                          <div>مدیریت اپراتور ها</div>
                                      </div>
                                  </div>
                                  <div class="drawer-content" id="admin" style="display:none">
                                      <div class="grid">
                                          <div class="form-group">
                                              <label>نام کاربری اپراتور</label>
                                              <input type="text" name="adminUsername" placeholder="نام کاربری اپراتور جدید را وارد کنید " value="${m.adminUsername||``}">
                                          </div>
                                          <div class="form-group">
                                              <label>رمز عبور </label>
                                              <input type="password" name="adminPassword" placeholder="رمز عبور اپراتور جدید را وارد کنید">
                                          </div>
                                      </div>
                                  </div>
                              </div>

                              <!-- POS Device -->
                              <div class="drawer">
                                  <div class="drawer-summary" onclick="toggleDrawer('pos')">
                                       <div style="display: flex; align-items: center; justify-content: start; gap: 10px;">
                                          ${y(`pay`)}
                                          <div>تنظیمات کارتخوان (POS)</div>
                                      </div>
                                  </div>
                                  <div class="drawer-content" id="pos" style="display:none">
                                      <div class="form-group">
                                          <label>انتخاب پروتکل کارتخوان</label>
                                          <select name="posDevice">
                                              <option value="SAMAN" ${m.posDevice===`SAMAN`?`selected`:``}>سامان کیش</option>
                                              <option value="IRAN" ${m.posDevice===`IRAN`?`selected`:``}>ایران کیش</option>
                                              <option value="FAN" ${m.posDevice===`FAN`?`selected`:``}>فن آوا</option>
                                              <option value="SADAD" ${m.posDevice===`SADAD`?`selected`:``}>سداد</option>
                                          </select>
                                      </div>
                                  </div>
                              </div>

                              <!-- Date & Time -->
                              <div class="drawer">
                                  <div class="drawer-summary" onclick="toggleDrawer('datetime')">
                                      <div style="display: flex; align-items: center; justify-content: start; gap: 10px;">
                                          ${y(`setting`)}
                                          <div>تنظیم زمان و تاریخ</div>
                                      </div>
                                  </div>
                                  <div class="drawer-content" id="datetime" style="display:none">
                                      <div class="grid">
                                          <div class="form-group">
                                              <label>تاریخ</label>
                                                <input type="date" name="setDate" value="${m.currentDate||n}">
                                          </div>
                                          <div class="form-group">
                                              <label>ساعت</label>
                                              <input type="time" name="setTime" value="${m.currentTime||r}">
                                          </div>
                                      </div>
                                  </div>
                              </div>

                                          <!-- رخدادها -->
                              <div class="drawer" onclick="handleNavigation('#/logs')">
                                  <div class="drawer-summary">
                                      <div style="display: flex; align-items: center; justify-content: start; gap: 10px; cursor: pointer;">
                                          ${y(`logs`)}
                                          <div>رخدادها</div>
                                      </div>
                                  </div>
                              </div>

                              <!-- تنظیمات کارخانه -->
                              <div class="drawer" onclick="handleNavigation('#/factory')">
                                  <div class="drawer-summary">
                                      <div style="display: flex; align-items: center; justify-content: start; gap: 10px; cursor: pointer; color: var(--danger);">
                                          ${y(`refresh`)}
                                          <div>تنظیمات کارخانه</div>
                                      </div>
                                  </div>
                              </div>


                          </form>
                      </div>

                        <div class="page-action-bar">
                              <button type="submit" form="settingsForm" class="btn">ذخیره تمامی تغییرات</button>
                              <button type="button" class="btn btn-outline" onclick="handleNavigation('#/')">بازگشت</button>
                        </div>

                  `,K(),await xe()}function K(){let e=document.getElementById(`settingsForm`);if(e){let t=new FormData(e);s=JSON.stringify(Object.fromEntries(t.entries()))}}function _e(){let e=document.getElementById(`settingsForm`);if(!e||!s)return!1;let t=new FormData(e),n=JSON.stringify(Object.fromEntries(t.entries()));return s!==n}async function q(e){b(!0);let t=new FormData(e);Object.fromEntries(t.entries());let n={success:!0};return b(!1),n&&n.success?(D(`success`,`موفق`,`✅ تنظیمات با موفقیت ذخیره شد.`),K(),!0):(D(`error`,`خطا`,`❌ خطا در ذخیره‌سازی!`),!1)}async function ve(e){e.preventDefault();let t=e.target;w({message:`
                          <div style="line-height: 1.9; text-align: right;">
                              <p>آیا این تغییرات انجام شده را تایید می‌کنید؟</p>
                          </div>
                      `,type:`danger`,onConfirm:async e=>{e.remove(),await q(t)},onCancel:()=>{}})}function ye(e){let t=document.getElementById(`settingsForm`);_e()?w({message:`
                              <div style="line-height: 1.9; text-align: right;">
                                  <p>تغییراتی در تنظیمات اعمال کرده‌اید. آیا مایلید قبل از خروج آن‌ها را ذخیره کنید؟</p>
                              </div>
                          `,type:`warning`,onConfirm:async n=>{n.remove(),await q(t)&&(location.hash=e)},onCancel:t=>{t.remove(),location.hash=e}}):location.hash=e}function be(e){let t=0;return t=e>-50?4:e>-60?3:e>-70?2:1,`
                  <div class="wifi-bars level-${t}">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                  </div>
                  `}async function xe(){let e=document.getElementById(`wifiList`);if(e){e.innerHTML=`
                      <div class="wifi-loading">
                          در حال اسکن شبکه‌ها...
                      </div>
                  `;try{let t=[{ssid:`RobotMarket_5G`,rssi:-45,secure:!0,connected:!0},{ssid:`RobotMarket`,rssi:-70,secure:!1,connected:!1},{ssid:`RobotMarket-3`,rssi:-60,secure:!1,connected:!1},{ssid:`RobotMarket-2`,rssi:-50,secure:!1,connected:!1}];t.sort((e,t)=>t.rssi-e.rssi),e.innerHTML=t.map(e=>{let t=e.secure?`🔒`:``;return`
                                      <div class="wifi-item ${e.connected?`wifi-connected`:``}"
                                           data-ssid="${e.ssid}"
                                           onclick="selectWifi('${e.ssid}')">

                                          <div class="wifi-left">

                                              ${be(e.rssi)}

                                              <div class="wifi-name">
                                                  ${e.ssid}
                                                  ${t}
                                              </div>

                                          </div>


                                          <div class="wifi-status">
                                              ${e.connected?`متصل `:``}
                                          </div>

                                      </div>
                                    `}).join(``)}catch{e.innerHTML=`
                          <div class="wifi-error">
                              خطا در اسکن شبکه
                          </div>
                      `}}}function Se(e){w({message:`رمز شبکه <b>${e}</b> را وارد کنید`,extraHtml:`
                                  <div class="form-group" style="margin-top:15px">

                                      <div style="display:flex;gap:6px">

                                          <button
                                              type="button"
                                              class="btn btn-outline"
                                              style="width: 44px"
                                            onclick="toggleInputVisibility('wifiPasswordModal')"
                                          >
                                              ${y(`eye`)}
                                          </button>

                                          <input
                                              dir="ltr"
                                              type="password"
                                              id="wifiPasswordModal"
                                              placeholder="رمز وای فای"
                                              style="flex:1"
                                          >

                                      </div>

                                  </div>
                                  `,onConfirm:async t=>{let n=t.querySelector(`#wifiPasswordModal`).value;if(!n)return D(`warning`,``,`قبل از تایید رمز را وارد کنید `);try{({success:!0}).success?(Ce(e,n),t.remove(),D(`success`,``,`اتصال به شبکه با موفقیت انجام شد`)):D(`error`,`خطا`,`اتصال به شبکه ناموفق بود`)}catch{D(`error`,`خطا`,`خطا در اتصال به شبکه`)}}})}function Ce(e,t){document.getElementById(`wifiSSID`).value=e,document.querySelector(`input[name='wifiPassword']`).value=t,document.querySelectorAll(`.wifi-item`).forEach(e=>e.classList.remove(`selected`));let n=[...document.querySelectorAll(`.wifi-item`)].find(t=>t.dataset?.ssid===e);n&&n.classList.add(`selected`)}function we(e,t=`text`){let n=document.getElementById(e);n&&(n.dataset.originalType||(n.dataset.originalType=n.type),n.type=n.type===n.dataset.originalType?t:n.dataset.originalType)}async function J(){b(!0),l=await E(`/api/prices`)||{},b(!1),e.innerHTML=`
                          <div class="card" style="padding-bottom: 80px">

                              <div style="display: flex; align-items: center; justify-content: start; gap: 10px">
                                  ${y(`server`)}
                                  <h2>مدیریت هوشمند کالاها</h2>
                              </div>

                              <div class="table-responsive">
                                  <table>
                                      <thead>
                                          <tr>
                                              <th class="col-index">کانال</th>
                                              <th class="col-name">نام کالا</th>
                                              <th class="col-qty">تعداد</th>
                                              <th class="col-price">قیمت (تومان)</th>
                                              <th class="col-settings">عملیات</th>
                                          </tr>
                                      </thead>
                                      <tbody id="priceTable"></tbody>
                                  </table>
                              </div>

                          </div>

                          <div class="page-action-bar">
                              <button class="btn" onclick="savePrices('submitBtnClicked')">ذخیره قیمت‌ها</button>
                              <button class="btn btn-outline" onclick="location.hash='#/'">بازگشت</button>
                          </div>
                          `;let t=document.getElementById(`priceTable`);for(let e in l){let n=l[e],r=!!n.disabledByServer,i=!!n.error,a=n.visible===!1,o=document.createElement(`tr`);r&&o.classList.add(`row-disabled`),i&&o.classList.add(`row-error`),a&&o.classList.add(`row-error`);let s=n.quantity>0&&n.quantity<=3;o.innerHTML=`
                <td class="col-index">
                    <span class="channel-badge ${i?`channel-badge-error`:``}">
                        ${n.channel??`-`}
                    </span>
                </td>
                <td class="col-name">
                    <input onblur="saveFieldPrice(this)" class="input-text" type="text" value="${n.name||`---`}" data-key="${e}" data-field="name" ${r?`disabled`:``}>
                </td>
                <td class="col-qty">
                    <input
                        onblur="saveFieldPrice(this)"
                        class="input-number ${s?`stock-warning`:``}"
                        type="number"
                        value="${n.quantity||0}"
                        data-key="${e}"
                        data-field="quantity"
                        ${r?`disabled`:``}
                        style="${s?`border: 1px solid #ffbf00; background-color: #fff2f0;`:``}"
                    >
                </td>

                <td class="col-price">
                    <input class="input-number" onblur="saveFieldPrice(this)" type="number" value="${n.price||0}" data-key="${e}" data-field="price" step="1000" min="0" ${r?`disabled`:``}>
                </td>

                <td class="col-settings">
                    <button class="btn-manage" onclick="openAdvancedSettings('${e}')" ${r?`disabled`:``}>
                        ${y(i?`warning`:`setting`)}
                    </button>
                </td>
            `,t.appendChild(o)}}function Te(e){let t=l[e],n=t.name||``,r=t.price||0,i=t.quantity||0,a=String(t.size||`1`),o=t.barcode||`11123455556789`,s=t.visible??!0,c=t.channel??`-`,u=t.error||``,d=Y({key:e,channel:c,error:u,disabledByServer:t.disabledByServer||``,visible:s});w({message:`
                      <div class="adv-modal">
                          <div class="modal-product-icon">
                          ${y(`products`)}
                          </div>

                          <p style="text-align: center; margin-bottom: 10px;">
                             پیکربندی کانال ${c}
                          </p>

                          <div class="input-group">
                              <label>تغییر نام</label>
                              <input type="text" id="modalName" placeholder="نام محصول" value="${n}" class="input-text">
                          </div>

                          <div class="input-group">
                              <label>بارکد کالا</label>
                              <input
                                  type="text"
                                  id="modalBarcode"
                                  value="${o}"
                                  class="input-text"
                                  placeholder="بارکد محصول"
                                  inputmode="numeric"
                                  autocomplete="off"
                              >
                          </div>

                          <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                              <div class="input-group">
                                  <label>قیمت</label>
                                  <input type="number" id="modalPrice" value="${r}" class="input-number">
                              </div>

                             <div class="input-group">
                              <label>تعداد</label>

                              <div class="qty-control">
                                  <button type="button" class="qty-btn" onclick="changeQty(-1)">−</button>

                                  <input
                                      type="number"
                                      id="modalQty"
                                      value="${i}"
                                      class="input-number qty-input"
                                      min="0"
                                  >

                                  <button type="button" class="qty-btn" onclick="changeQty(1)">+</button>
                              </div>
                          </div>

                          </div>

                          <div class="gift-section">
                              <label>کانال‌های هدیه (10,11 ...)</label>
                              <div class="gift-grid" style="display: flex; gap: 5px;">
                                  <input type="number" id="gift1" placeholder="1" class="input-number" value="${t.gifts?.[0]||``}">
                                  <input type="number" id="gift2" placeholder="2" class="input-number" value="${t.gifts?.[1]||``}">
                                  <input type="number" id="gift3" placeholder="3" class="input-number" value="${t.gifts?.[2]||``}">
                              </div>
                          </div>

                          <div  class="input-group">
                              <div class="toggle-row">
                                  <span>غیر فعال سازی کانال</span>
                                  <label class="switch">
                                    <input
                                        type="checkbox"
                                        id="modalVisible"
                                        ${s?`checked`:``}
                                        ${u?`disabled`:``}
                                    >
                                    <span class="slider"></span>
                                  </label>
                              </div>
                          </div>

                        <div class="advanced-hint-box ${u?`advanced-hint-error`:`hidden`}" id="advancedHintBox">
                            ${d}
                        </div>

                          <div class="input-group">
                              <label>فضای اشغال شده (Slot Size)</label>
                              <select
                                  id="modalSize"
                                  class="input-select"
                                  onchange="checkPhysicalChange(event)"
                                  data-prev-value="${a}"
                              >
                                  <option value="1" ${a===`1`?`selected`:``}>1 کانال (استاندارد)</option>
                                  <option value="2" ${a===`2`?`selected`:``}>2 کانال (عریض)</option>
                                  <option value="3" ${a===`3`?`selected`:``}>3 کانال (خیلی عریض)</option>
                                  <option value="4" ${a===`4`?`selected`:``}>4 کانال (کامل)</option>
                              </select>
                          </div>
                      </div>
                  `,type:`noType`,onConfirm:async n=>{let r={id:t.id,channel:c,name:document.getElementById(`modalName`).value.trim(),barcode:document.getElementById(`modalBarcode`).value.trim(),price:Number(document.getElementById(`modalPrice`).value||0),quantity:Number(document.getElementById(`modalQty`).value||0),size:Number(document.getElementById(`modalSize`).value||1),visible:document.getElementById(`modalVisible`).checked,gifts:[document.getElementById(`gift1`).value.trim(),document.getElementById(`gift2`).value.trim(),document.getElementById(`gift3`).value.trim()]};l[e]={...l[e],...r};try{await Me(t.id,r),l[e]={...l[e],...r},await J(),n.remove();return}catch{D(`error`,`خطا`,`ذخیره تغییرات با خطا مواجه شد ❌`)}await J(),n.remove()}})}function Ee(e){let t=document.getElementById(`modalQty`),n=Number(t.value||0);n+=e,n<0&&(n=0),t.value=n}function De(e){if(c)return;let t=l[e];if(!t){D(`error`,`خطا`,`اطلاعات کانال پیدا نشد.`);return}w({type:`warning`,message:`
                          <div style="text-align:right; line-height:1.9;">
                              آیا مطمئن هستید که ایراد
                              <strong>کانال ${t.channel}</strong>
                              رفع شده است؟
                              <br>
                              <small style="opacity:0.8;">
                                  با تایید شما، درخواست ثبت رفع ایراد به سرور ارسال می‌شود.
                              </small>
                          </div>
                      `,showConfirm:!0,onConfirm:async n=>{if(!c)try{c=!0,b(!0);let r=await E(`/api/price-resolve-error/${t.id}`,`POST`);if(r?.success===!1)throw Error(r.message||`ثبت رفع ایراد انجام نشد`);l[e]={...l[e],error:``};let i=document.getElementById(`advancedHintBox`);if(i){i.classList.remove(`advanced-hint-error`),i.classList.add(`hidden`),i.innerHTML=Y({key:e,channel:t.channel,error:``,disabledByServer:t.disabledByServer,visible:t.visible});let n=document.getElementById(`modalVisible`);n&&(n.disabled=!1)}await J(),D(`success`,`موفق`,`ایراد کانال ${t.channel} با موفقیت رفع شد.`,4e3),n.remove()}catch(e){D(`error`,`خطا`,e.message||`ارتباط با سرور ناموفق بود.`,5e3)}finally{c=!1,b(!1)}},onCancel:()=>{D(`info`,`لغو شد`,`عملیات رفع ایراد کانال ${t.channel} لغو شد.`,2500)}})}function Y({key:e,channel:t,error:n,disabledByServer:r,visible:i}){let a=[];return a.push(`<div><strong>کانال:</strong> ${t}</div>`),i||a.push(`<div>این کالا در حال حاضر در فروشگاه نمایش داده نمی‌شود.</div>`),r&&a.push(`<div>این کانال به دلیل وضعیت فیزیکی یا تداخل با کانال دیگر غیرفعال شده است.</div>`),n?a.push(`
                          <div class="advanced-hint-error-text">
                              <strong>خطا:</strong> ${n}
                          </div>
                          <div class="advanced-hint-actions" style="margin-top:10px;">
                              <button
                                  class="btn btn-danger"
                                  type="button"
                                  onclick="resolveChannelError('${e}')"
                              >
                                  رفع ایراد
                              </button>
                          </div>
                      `):a.push(`<div>وضعیت کانال در حال حاضر بدون خطا ثبت شده است.</div>`),a.join(``)}function Oe(e){let t=e.target,n=t.value,r=t.dataset.prevValue||`1`;if(n===`1`){t.dataset.prevValue=n;return}_={select:t,oldValue:r,newValue:n},w({message:`
                              <div style="line-height: 1.9; text-align: right;">
                                  <p>شما در حال تغییر فضای اشغال شده دستگاه به <strong>${n}</strong> کانال هستید.</p>
                                  <p>این تغییر نیاز به اصلاح فیزیکی در دستگاه دارد. آیا این تغییر انجام شده و تایید می‌کنید؟</p>
                              </div>
                              `,type:`danger`,onConfirm:async e=>{_&&(_.select.dataset.prevValue=_.newValue,_=null,e.remove())},onCancel:()=>{_&&=(_.select.value=_.oldValue,_.select.dataset.prevValue=_.oldValue,null)}})}async function ke(){b(!0),d=await E(`/api/info`)||{},b(!1);let t=d.wifi||{},n=d.last_operation||{};e.innerHTML=`
                          <div class="card">
                          <div style="display: flex;justify-content: start;align-items: center; gap: 10px">
                              ${y(`reports`)}
                              <h2> اطلاعات دستگاه</h2>
                          </div>

                              <div class="drawer">
                                  <div class="drawer-summary" onclick="toggleDrawer('general-info')">اطلاعات کلی دستگاه</div>
                                  <div class="drawer-content" id="general-info">
                                      <div class="section">
                                          ${T(`شماره سریال دستگاه`,d.SN)}
                                          ${T(`نسخه نرم‌افزار ESP`,d.esp_version)}
                                          ${T(`نسخه نرم‌افزار STM`,d.stm_version)}
                                          ${T(`نسخه برد`,d.board_version)}
                                          ${T(`نوع چیپ ESP`,d.esp_chip)}
                                          ${T(`نوع چیپ STM`,d.stm_chip)}
                                      </div>
                                  </div>
                              </div>

                              <div class="drawer">
                                  <div class="drawer-summary" onclick="toggleDrawer('memory-info')">اطلاعات حافظه دستگاه</div>
                                  <div style="display: none" class="drawer-content" id="memory-info">
                                      <div class="section">
                                          ${T(`حافظه هیپ استفاده شده`,d.heap_used)}
                                          ${T(`حافظه هیپ کل`,d.heap_total)}
                                          ${T(`حافظه فلش استفاده شده`,d.flash_used)}
                                          ${T(`حافظه فلش کل`,d.flash_total)}
                                      </div>
                                  </div>
                              </div>

                              <div class="drawer">
                                  <div class="drawer-summary" onclick="toggleDrawer('wifi-sta-info')">وضعیت اتصال دستگاه به وای‌فای</div>
                                  <div style="display: none" class="drawer-content" id="wifi-sta-info">
                                      <div class="section">
                                          ${T(`نام شبکه وای‌فای متصل شده`,t.wifi_sta_ssid)}
                                          ${T(`آدرس شبکه دستگاه`,t.wifi_sta_ip)}
                                          ${T(`وضعیت اتصال به وای‌فای`,t.wifi_sta_connected)}
                                          ${T(`شناسه سخت‌افزاری دستگاه (MAC)`,t.mac)}
                                          ${T(`قدرت سیگنال (RSSI)`,t.rssi)}
                                          ${T(`وضعیت سیستم`,t.system_status)}
                                      </div>
                                  </div>
                              </div>

                              <div class="drawer">
                                  <div class="drawer-summary" onclick="toggleDrawer('wifi-ap-info')">اطلاعات نقطه دسترسی دستگاه</div>
                                  <div style="display: none" class="drawer-content" id="wifi-ap-info">
                                      <div class="section">
                                          ${T(`نام شبکه‌ای که دستگاه ایجاد کرده`,t.wifi_ap_ssid)}
                                          ${T(`آدرس شبکه این نقطه دسترسی`,t.wifi_ap_ip)}
                                          ${T(`تعداد دستگاه‌های متصل به این شبکه`,t.wifi_ap_connected_devices)}
                                      </div>
                                  </div>
                              </div>

                              <div class="drawer">
                                  <div class="drawer-summary" onclick="toggleDrawer('last-operation-info')">آخرین عملیات دستگاه</div>
                                  <div style="display: none" class="drawer-content" id="last-operation-info">
                                      <div class="section">
                                          ${T(`عنوان عملیات`,n.title)}
                                          ${T(`زمان عملیات`,n.time)}
                                          ${T(`وضعیت عملیات`,n.status)}
                                      </div>
                                  </div>
                              </div>
                          </div>

                         <div class="page-action-bar">
                              <button class="btn btn-outline" onclick="location.hash='#/'">بازگشت</button>
                          </div>
              `}async function Ae(e){let t=`\${getIcon("${e}")}`;await navigator.clipboard.writeText(t);let n=document.getElementById(`copied`);n.innerText=t+` copied`,n.style.opacity=`1`,n.style.transform=`translateX(-50%) translateY(0)`,setTimeout(()=>{n.style.opacity=`0`,n.style.transform=`translateX(-50%) translateY(20px)`},1200)}async function X(){b(!0),X=await E(`/api/service/config`)||{},b(!1),e.innerHTML=`
                              <div class="card" style="padding-bottom: 80px">

                                  <div style="display:flex;align-items:center;gap:10px">
                                      ${y(`setting`)}
                                      <h2>تنظیمات سرویس دستگاه</h2>
                                  </div>

                                  <!-- PAYMENT SECTION -->

                      <div class="drawer">
                      <div class="drawer-summary" onclick="toggleDrawer('payment-config')">
                      تنظیمات سیستم پرداخت
                      </div>

                      <div class="drawer-content" id="payment-config">

                      <div class="section">
                      ${T(`دستگاه سکه‌گیر`,h.payment.coin_acceptor)}
                      ${T(`اسکناس‌گیر`,h.payment.bill_acceptor)}
                      ${T(`پایانه کارتخوان`,h.payment.pos_terminal)}
                      ${T(`پرداخت کیف پول`,h.payment.wallet_payment)}
                      </div>

                      </div>
                      </div>


                          <!-- AUXILIARY SECTION -->

                      <div class="drawer">
                      <div class="drawer-summary" onclick="toggleDrawer('auxiliary-config')">
                      سیستم‌های جانبی دستگاه
                      </div>

                      <div style="display:none" class="drawer-content" id="auxiliary-config">

                      <div class="section">
                      ${T(`فن خنک‌کننده`,h.auxiliary.cooling_fan)}
                      ${T(`سیستم روشنایی`,h.auxiliary.lighting_system)}
                      ${T(`سنسور دما`,h.auxiliary.temperature_sensor)}
                      ${T(`سنسور درب دستگاه`,h.auxiliary.door_sensor)}
                      </div>

                      </div>
                      </div>


                          <!-- ELEVATOR SECTION -->

                      <div class="drawer">
                      <div class="drawer-summary" onclick="toggleDrawer('elevator-config')">
                      وضعیت آسانسور دستگاه
                      </div>

                      <div style="display:none" class="drawer-content" id="elevator-config">

                      <div class="section">
                      ${T(`فعال بودن آسانسور`,h.elevator.elevator_enabled)}
                      ${T(`وضعیت موتور آسانسور`,h.elevator.elevator_motor_status)}
                      ${T(`موقعیت فعلی آسانسور`,h.elevator.elevator_position)}
                      ${T(`سنسور موقعیت آسانسور`,h.elevator.elevator_sensor)}
                      </div>

                      </div>
                      </div>

                      </div>

                      <div class="page-action-bar">
                      <button class="btn btn-outline" onclick="location.hash='#/'">
                      بازگشت
                      </button>
                      </div>
                      `}async function je(e=``){let t=document.querySelectorAll(`#priceTable input`),n={};t.forEach(e=>{let t=e.dataset.key,r=e.dataset.field;n[t]||(n[t]={}),n[t][r]=e.value}),b(!0);let r=await E(`/api/prices`,`POST`,n);b(!1),e===`submitBtnClicked`&&(r&&r.success?D(`success`,`موفق`,`✅ قیمت‌ها ذخیره شدند`):D(`error`,`خطا`,`❌ خطا در ذخیره قیمت‌ها`))}async function Me(e,t){return E(`/api/prices/${e}`,`PUT`,t)}async function Ne(e){let t=e.dataset.key,n=e.dataset.field,r=l[t];if(!r)return;let i=e.type===`number`?Number(e.value||0):e.value.trim();try{await E(`/api/prices/${r.id}`,`PATCH`,{[n]:i}),r[n]=i,Z(e,!0)}catch{Z(e,!1)}}function Z(e,t){e.style.borderColor=t?`#22c55e`:`#ef4444`}document.addEventListener(`click`,function(e){document.querySelectorAll(`.user-dropdown`).forEach(t=>{t.parentElement.contains(e.target)||t.classList.remove(`open`)})});async function Pe(){b(!0),g=await E(`/api/factory`),b(!1);let t=g;e.innerHTML=`
                      <div class="card">
                      <h2>تنظیمات کارخانه (Factory)</h2>
                      <form id="factoryForm">

                          <!-- NETWORK -->
                      <div class="drawer">
                      <div class="drawer-summary" onclick="toggleDrawer('network')">شبکه و DNS</div>
                      <div class="drawer-content" style="display: none" id="network">
                      <div class="section">
                      <label>DNS Server 1</label>
                      <input type="text" name="dns1" value="${t.dns1||`8.8.8.8`}">

                      <label>DNS Server 2</label>
                      <input type="text" name="dns2" value="${t.dns2||`8.8.4.4`}">

                      <div class="switch-row" style="margin-top:15px;">
                      <span>تنظیمات IP دستی (Static)</span>
                      <label class="switch">
                      <input type="checkbox" id="manualIpToggle" name="use_static" ${t.use_static?`checked`:``} onchange="toggleManualIpFields()">
                      <span class="slider"></span>
                      </label>
                      </div>

                      <div id="manualIpFields" style="display: ${t.use_static?`grid`:`none`}; gap:10px; margin-top:10px;">
                      <input type="text" name="static_ip" value="${t.static_ip||``}" placeholder="IP">
                      <input type="text" name="static_gw" value="${t.static_gw||``}" placeholder="Gateway">
                      <input type="text" name="static_sn" value="${t.static_sn||``}" placeholder="Subnet Mask">
                      </div>
                      </div>
                      </div>
                      </div>

                          <!-- CORE -->
                      <div class="drawer">
                      <div class="drawer-summary" onclick="toggleDrawer('core')">هسته سیستم (Core)</div>
                      <div class="drawer-content" style="display: none" id="core" style="display:block;">
                      <div class="section">
                      <label>شماره سریال (Serial Number)</label>
                      <input type="text" name="serial" value="${t.serial||``}">

                      <div class="auth-box" style="background:var(--primary-surface); padding:15px; border-radius:10px; text-align:center; margin:10px 0;">
                      <div id="authCode" style="font-size:24px; font-weight:bold; color:var(--primary); letter-spacing:5px;">----</div>
                      <button type="button" class="btn-small" onclick="generateFactoryCode()">تولید کد تایید</button>
                      </div>

                      <label>کد تایید نهایی</label>
                      <input type="number" name="sn_pass" id="input_sn_pass" placeholder="کد پشتیبان را وارد کنید">
                      </div>
                      </div>
                      </div>

                          <!-- MQTT -->
                      <div class="drawer">
                      <div class="drawer-summary" onclick="toggleDrawer('mqtt')">تنظیمات MQTT</div>
                      <div class="drawer-content" style="display: none" id="mqtt">
                      <div class="section">
                      <input type="text" name="mqtt_host" value="${t.mqtt_host||``}" placeholder="Broker Host">
                      <input type="number" name="mqtt_port" value="${t.mqtt_port||8883}" placeholder="Port">
                      <input type="text" name="mqtt_topic" value="${t.mqtt_topic||``}" placeholder="Topic">

                      <div class="switch-row">
                      <span>Auto TLS Certificate</span>
                      <label class="switch">
                      <input type="checkbox" id="mqttAuto" name="mqtt_auto" ${t.mqtt_auto?`checked`:``} onchange="toggleCert('mqtt')">
                      <span class="slider"></span>
                      </label>
                      </div>
                      <textarea id="mqttCert" name="mqtt_cert" rows="4" style="display:${t.mqtt_auto?`none`:`block`};">${t.mqtt_cert||``}</textarea>
                      </div>
                      </div>
                      </div>

                          <!-- OTA -->
                      <div class="drawer">
                      <div class="drawer-summary" onclick="toggleDrawer('ota')">آپدیت آنلاین (OTA)</div>
                      <div class="drawer-content" style="display: none" id="ota">
                      <div class="section">
                      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                      <div>
                      <label>Primary Server</label>
                      <input type="text" name="ota_primary" value="${t.ota_primary||``}" placeholder="سرور اصلی">
                      </div>
                      <div>
                      <label>Secondary Server</label>
                      <input type="text" name="ota_secondary" value="${t.ota_secondary||``}" placeholder="سرور پشتیبان">
                      </div>
                      <div>
                      <label>Version File</label>
                      <input type="text" name="ota_version" value="${t.ota_version||``}" placeholder="نسخه (مثلا version.json)">
                      </div>
                      <div>
                      <label>Firmware File</label>
                      <input type="text" name="ota_bin" value="${t.ota_bin||``}" placeholder="فایل (مثلا firmware.bin)">
                      </div>
                      </div>

                      <div class="switch-row" style="margin-top:15px;">
                      <span>Auto TLS Certificate</span>
                      <label class="switch">
                      <input type="checkbox" id="otaAuto" name="ota_auto" ${t.ota_auto?`checked`:``} onchange="toggleCert('ota')">
                      <span class="slider"></span>
                      </label>
                      </div>

                      <textarea id="otaCert" name="ota_cert" rows="5"
                      style="display:${t.ota_auto?`none`:`block`}; margin-top:10px;">${t.ota_cert||``}</textarea>
                      </div>
                      </div>
                      </div>
                      </form>
                      </div>


                      <div class="page-action-bar" >
                      <button type="button" class="btn" onclick="saveFactorySettings()"> ذخیره تنظیمات</button>
                      <button type="button" class="btn btn-outline" style="border-color:var(--danger); color:var(--danger);" onclick="resetFactoryToDefault()">
                      ریست فکتوری
                      </button>
                      <button class="btn btn-outline" onclick="location.href='#/settings'">بازگشت</button>
                      </div>
                      `,Q()}function Fe(){let e=document.getElementById(`manualIpToggle`).checked;document.getElementById(`manualIpFields`).style.display=e?`grid`:`none`}function Ie(e){let t=document.getElementById(e+`Auto`).checked;document.getElementById(e+`Cert`).style.display=t?`none`:`block`}function Q(){let e=Math.floor(1e3+Math.random()*9e3);document.getElementById(`authCode`).innerText=e}async function Le(){let e=document.getElementById(`factoryForm`),t=new FormData(e),n=Object.fromEntries(t.entries());n.use_static=document.getElementById(`manualIpToggle`).checked,n.mqtt_auto=document.getElementById(`mqttAuto`).checked,b(!0);let r=await E(`/api/factory-save`,`POST`,n);b(!1),r&&r.success?D(`success`,`موفق`,`✅ تنظیمات کارخانه با موفقیت ذخیره شد.`):D(`error`,`خطا`,`❌ خطا در ذخیره. احتمالاً کد تایید اشتباه است.`)}async function Re(){w({message:`آیا مطمئن هستید که می‌خواهید تمام تنظیمات را به حالت اول برگردانید؟ این عمل غیرقابل بازگشت است!`,type:`danger`,onConfirm:async()=>{b(!0);let e=await E(`/api/factory-reset`,`POST`,{confirm:!0});b(!1),e.success?(D(`success`,`موفق`,`✅ تنظیمات کارخانه با موفقیت ریست شد .`),location.reload()):D(`error`,`خطا`,`❌ خطا در اتصال به سرور`)}})}function ze(){e.innerHTML=`

                              <div class="card" style="padding-bottom: 80px">
                                <div style="display: flex;justify-content: start;align-items: center; gap: 10px">
                                  ${y(`logs`)}
                                  <h2>لاگ سیستمی</h2>
                                </div>
                                  <div style="height:70vh;  overflow:auto" id="logArea"></div>
                              </div>

                              <div class="page-action-bar">
                                  <button class="btn btn-outline" onclick="location.href='#/settings'">بازگشت</button>
                              </div>

                      `;let t=document.getElementById(`logArea`),n=[`سیستم راه‌اندازی شد`,`اتصال وای‌فای برقرار شد`,`دریافت درخواست از کاربر`,`قیمت کالا بروزرسانی شد`,`دستگاه جدید متصل شد`,`درخواست API دریافت شد`,`بروزرسانی موجودی انجام شد`,`بررسی وضعیت شبکه`,`سیستم در حال اجرا است`,`عملیات با موفقیت انجام شد`],r=0;setInterval(()=>{let e=n[r%n.length];t.innerHTML+=`

                              <div>
                                  [${new Date().toLocaleString(`fa-ir`)}]
                                  ${e}
                              </div>

                      `,t.scrollTop=t.scrollHeight,r++},1e3)}function $(t){e.innerHTML=`
                  <div class="card" style="text-align:center"><h1>${t}
                  </h1><p>صفحه مورد نظر پیدا نشد!</p></div>
                      `}Object.assign(window,{addNewClient:fe,applyBalanceToAll:pe,changeQty:Ee,checkPhysicalChange:Oe,confirmSave:me,copyIconText:Ae,deleteClient:de,downloadBalanceCSV:he,downloadReport:z,generateFactoryCode:Q,handleNavigation:ye,logout:O,markNotificationsRead:V,openAdvancedSettings:Te,openClientsAdvancedSettings:U,rebootSystem:re,resetFactoryToDefault:Re,resolveChannelError:De,saveFactorySettings:Le,saveFieldPrice:Ne,savePrices:je,saveSettings:ve,selectWifi:Se,setVolume:I,showToast:D,toggleCert:Ie,toggleDrawer:C,toggleInputVisibility:we,toggleManualIpFields:Fe,toggleMenu:S,toggleUserMenu:ne});