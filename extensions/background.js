function requestListener(details) {
  let filter = browser.webRequest.filterResponseData(details.requestId);
  let decoder = new TextDecoder('utf-8');

  console.log(details.requestBody);

  filter.ondata = (event) => {
    let str = decoder.decode(event.data, { stream: true });
    console.log(str);
    filter.disconnect();
  };

  return {};
}

browser.webRequest.onBeforeRequest.addListener(
  requestListener,
  { urls: ['*://*.riiid.cloud/*'] },
  ['requestBody', 'blocking'],
);
