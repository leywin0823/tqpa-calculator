// popup.js

// 1. Inject content.js manually into active tab
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tabId = tabs[0].id;

  chrome.scripting.executeScript(
    {
      target: { tabId: tabId },
      files: ["content.js"]
    },
    () => {
      if (chrome.runtime.lastError) {
        document.getElementById("tqpa").textContent = "Script injection failed.";
      }
    }
  );
});

// 2. Listen for message from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "sendGrades") {
    const grades = message.data;
    let totalPoints = 0;
    let totalUnits = 0;

    grades.forEach(({ grade, units }) => {
      totalPoints += grade * units;
      totalUnits += units;
    });

    const tqpa =
      totalUnits > 0 ? (totalPoints / totalUnits).toFixed(2) : "N/A";

    document.getElementById("tqpa").textContent = `TQPA: ${tqpa}`;
  }
});
