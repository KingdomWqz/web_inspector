document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("log").addEventListener("click", async () => {
    const tabs = await chrome.tabs.query({ currentWindow: true, active: true });
    const activeTab = tabs[0];
    chrome.runtime.sendMessage({ tabId: activeTab.id, action: "Log" });
  });

  document.getElementById("test").addEventListener("click", async () => {
    const tabs = await chrome.tabs.query({ currentWindow: true, active: true });
    const activeTab = tabs[0];
    chrome.runtime.sendMessage({ tabId: activeTab.id, action: "Test" });
  });
});
