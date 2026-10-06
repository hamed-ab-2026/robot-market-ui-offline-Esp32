/**
 * Renders the logs page shell.
 */
export function renderLogsPageShell({logsIcon}) {
    return `
                              <div class="card" style="padding-bottom: 80px">
                                <div style="display: flex;justify-content: start;align-items: center; gap: 10px">
                                  ${logsIcon}
                                  <h2>لاگ سیستمی</h2>
                                </div>
                                  <div id="logConnectionStatus" class="muted-text">در حال اتصال به سرویس لاگ...</div>
                                  <div style="height:70vh; overflow:auto" id="logArea"></div>
                              </div>

                              <div class="page-action-bar">
                                  <button class="btn btn-outline" data-page-back>بازگشت</button>
                              </div>
                      `;
}
