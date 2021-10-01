const dataStore = {};

function listener(details) {
  if (details.requestBody) {
    dataStore[details.requestId] = details.requestBody;
  }
}

function headerListener(details) {
  let isGrpcCall = false;
  for (let header of details.requestHeaders) {
    if (header.name === 'x-grpc-web' && header.value === '1') {
      isGrpcCall = true;
    }
  }

  if (isGrpcCall) {
    console.log(dataStore[details.requestId]);

    let filter = browser.webRequest.filterResponseData(details.requestId);

    filter.ondata = (event) => {
      console.log(event.data);

      filter.write(event.data);
      filter.disconnect();
    };
  }
}

browser.webRequest.onBeforeRequest.addListener(
  listener,
  { urls: ['*://*.riiid.cloud/*'] },
  ['requestBody', 'blocking'],
);

browser.webRequest.onBeforeSendHeaders.addListener(
  headerListener,
  { urls: ['*://*.riiid.cloud/*'] },
  ['requestHeaders', 'blocking'],
);
