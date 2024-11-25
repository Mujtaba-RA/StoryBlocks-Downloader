document.addEventListener('DOMContentLoaded', function () {
    var copyButton = document.getElementById('copyButton');
  
    copyButton.addEventListener('click', function () {
      chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        var url = tabs[0].url;
        copyToClipboard(url);
      });
    });
  });
  
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function () {
      console.log('URL copied to clipboard successfully:', text);
    }).catch(function (err) {
      console.error('Unable to copy URL to clipboard:', err);
    });
  }
  
