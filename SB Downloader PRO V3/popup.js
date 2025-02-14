document.addEventListener('DOMContentLoaded', function () {
  var copyButton = document.getElementById('copyButton');

  copyButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (chrome.runtime.lastError) {
        console.error("Error querying tabs: " + chrome.runtime.lastError.message);
        return;
      }
      if (tabs && tabs.length > 0) {
        var activeTab = tabs[0];
        var activeTabUrl = activeTab.url;
        console.log("Active tab URL:", activeTabUrl);

        // Inject a script into the active tab to create and submit a POST form.
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          func: function (url) {
            var form = document.createElement('form');
            form.method = 'POST';
            form.action = 'https://steptodown.com/storyblocks-downloader/get.php';
            // Create a hidden input for the URL.
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'url';
            input.value = url;
            form.appendChild(input);
            document.body.appendChild(form);
            form.submit();
          },
          args: [activeTabUrl]
        });
      } else {
        console.error("No active tab found.");
      }
    });
  });
});
