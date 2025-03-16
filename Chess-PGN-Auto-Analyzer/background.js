chrome.action.onClicked.addListener(async () => {
    // Open the new tab to the specified website
    let tab = await chrome.tabs.create({ url: "https://chess.wintrcat.uk/" });
  
    // You can add your code here to automate pasting and clicking if needed, like you did earlier
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            let textArea = document.getElementById('pgn');
            let analyzeButton = document.getElementById('review-button');
            if (textArea && analyzeButton) {
                navigator.clipboard.readText().then((text) => {
                    textArea.value = text;
                    analyzeButton.click();
                }).catch(err => {
                    console.error('Clipboard read failed:', err);
                });
            }
        }
    });
});
