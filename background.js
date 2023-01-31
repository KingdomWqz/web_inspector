const onAttach = (debuggee) => {
  if (chrome.runtime.lastError) {
    alert(chrome.runtime.lastError.message);
    return;
  }

  console.log("attach succeed");
  console.log(debuggee.tabId);
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request, sender);
  if (request.action === "Log") {
    console.log("Log");

    const debuggee = { tabId: request.tabId };
    chrome.debugger.attach(debuggee, "1.3", onAttach.bind(null, debuggee));
  } else if (request.action === "Test") {
    console.log("Test");

    const debuggee = { tabId: request.tabId };
    chrome.debugger.sendCommand(debuggee, "DOM.enable");
    chrome.debugger.sendCommand(debuggee, "Overlay.enable");
    chrome.debugger.sendCommand(debuggee, "Overlay.setInspectMode", 
      {
        mode: "searchForNode",
        highlightConfig: {
          showInfo: true,
          showStyles: true,
          contentColor: {r:0, g:0, b:155, a:0.5},
        }
      }
    );
  }
  return true;
});
