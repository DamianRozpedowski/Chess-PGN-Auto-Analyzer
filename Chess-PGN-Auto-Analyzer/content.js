// Ensure the document is focused before accessing clipboard
window.focus();

// Try to read clipboard and paste it into the text area
let textArea = document.getElementById('pgn');
let analyzeButton = document.getElementById('review-button');

if (textArea && analyzeButton) {
    navigator.clipboard.readText().then((text) => {
        textArea.value = text;  // Paste clipboard content into text area
        analyzeButton.click();  // Click the analyze button
    }).catch(err => {
        console.error('Clipboard read failed:', err);
    });
}
