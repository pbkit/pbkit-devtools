const port = chrome.runtime.connect({ name: "@pbkit/devtools/content-script" });
port.postMessage({}); // init

window.addEventListener("message", ({ source, data }) => {
  if (source !== window) return;
  if (data?.target !== "@pbkit/devtools/panel") return;
  port.postMessage(data);
});

function injectScript(code) {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.innerText = code;
  document.body.appendChild(script);
  script.remove();
}
function unwrapFunctionCode(fn) {
  return fn.toString().slice("function () {".length, -"}".length);
}
injectScript(
  unwrapFunctionCode(function () {
    const devtoolsKey = "@pbkit/devtools";
    let resolve;
    const devtoolsConfigPromise = new Promise((res) => (resolve = res));
    if (!window[devtoolsKey]) {
      window[devtoolsKey] = [resolve];
    } else if (Array.isArray(window[devtoolsKey])) {
      window[devtoolsKey].push(resolve);
    } else {
      resolve(window[devtoolsKey]);
    }
    devtoolsConfigPromise.then((devtoolsConfig) => {
      devtoolsConfig.on("*", (event, type) => {
        const message = { target: "@pbkit/devtools/panel", event, type };
        window.postMessage(message, "*");
      });
    });
  })
);
