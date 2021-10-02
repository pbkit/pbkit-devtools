const dataStore = {};

function listener(details) {
  if (details.requestBody && details.type === 'xmlhttprequest') {
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

      browser.storage.local.get()
        .then((data) => {
            data[details.requestId] = {
              requestData: dataStore[details.requestId],
              responseData: event.data,
            };
            browser.storage.local.set(data)
              .then(() => {
                filter.write(event.data);
                filter.disconnect();
            })
        });
    };
  }
}

browser.webRequest.onBeforeRequest.addListener(
  listener,
  { urls: ['<all_urls>'] },
  ['requestBody', 'blocking'],
);

browser.webRequest.onBeforeSendHeaders.addListener(
  headerListener,
  { urls: ['<all_urls>'] },
  ['requestHeaders', 'blocking'],
);
