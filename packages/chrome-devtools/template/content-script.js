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
  (document.head || document.documentElement).appendChild(script);
  script.remove();
}
function unwrapFunctionCode(fn) {
  return fn.toString().slice("function () {".length, -"}".length);
}
injectScript(
  unwrapFunctionCode(function () {
    const devtoolsKey = "@pbkit/devtools";
    if (!window[devtoolsKey]) {
      window[devtoolsKey] = [register];
    } else if (Array.isArray(window[devtoolsKey])) {
      window[devtoolsKey].push(register);
    } else {
      register(window[devtoolsKey]);
    }
    function register(devtoolsConfig) {
      devtoolsConfig.on("*", (event, type) => {
        const message = { target: "@pbkit/devtools/panel", event, type };
        window.postMessage(message, "*");
      });
    }
  })
);
