document.getElementById("openChessSite").addEventListener("click", function() {
    // First, get the clipboard content
    navigator.clipboard.readText().then(function(clipboardText) {
      // Create a new tab to the chess website
      chrome.tabs.create({ url: "https://chess.wintrcat.uk/" }, function(tab) {
        // Wait for the tab to fully load
        chrome.tabs.onUpdated.addListener(function onTabUpdate(tabId, changeInfo, tabDetails) {
          if (tabId === tab.id && changeInfo.status === 'complete') {
            // Once the tab is fully loaded, inject the clipboard content into the textarea
            chrome.tabs.executeScript(tab.id, {
              code: `
                // Ensure the page is ready and the textarea is present
                window.addEventListener('load', function() {
                  var pgnTextarea = document.getElementById("pgn");
                  if (pgnTextarea) {
                    pgnTextarea.value = \`${clipboardText}\`;
                  } else {
                    console.error("Textarea not found.");
                  }
                });
              `
            });
  
            // Remove the event listener to avoid further triggering
            chrome.tabs.onUpdated.removeListener(onTabUpdate);
          }
        });
      });
    }).catch(function(error) {
      console.error('Clipboard read failed:', error);
    });
  });
  