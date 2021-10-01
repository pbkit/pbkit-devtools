function logUrl(details) {
    console.log("Loading: " + details.url);
}

browser.webRequest.onBeforeRequest.addListener(
    logUrl,
    {urls: ["<all_urls>"]}
);
