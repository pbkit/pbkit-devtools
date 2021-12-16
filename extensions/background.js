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

    let filter = chrome.webRequest.filterResponseData(details.requestId);

    filter.ondata = (event) => {
      console.log(event.data);

      chrome.storage.local.get()
        .then((data) => {
            data[details.requestId] = {
              requestData: dataStore[details.requestId],
              responseData: event.data,
            };
            chrome.storage.local.set(data)
              .then(() => {
                filter.write(event.data);
                filter.disconnect();
            })
        });
    };
  }
}

chrome.webRequest.onBeforeRequest.addListener(
  listener,
  { urls: ['<all_urls>'] },
  ['requestBody', 'blocking'],
);

chrome.webRequest.onBeforeSendHeaders.addListener(
  headerListener,
  { urls: ['<all_urls>'] },
  ['requestHeaders', 'blocking'],
);
