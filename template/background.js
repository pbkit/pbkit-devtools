chrome.runtime.onConnect.addListener((port) => {
  if (!port.name.startsWith("@pbkit/devtools/")) return;
  port.onMessage.addListener(relay);
  port.onDisconnect.addListener((port) => {
    port.onMessage.removeListener(relay);
    delConn(port);
  });
  function relay(message) {
    const tabId = message.tabId ?? port.sender.tab.id;
    setConn(tabId, port);
    message.target && getConn(tabId, message.target)?.postMessage(message);
  }
});

const connections = {};
const tabIds = new WeakMap();
const key = (tabId, name) => `${tabId}:${name}`;
const getConn = (tabId, name) => connections[key(tabId, name)];
const setConn = (tabId, port) => {
  tabIds.set(port, tabId);
  return (connections[key(tabId, port.name)] = port);
};
const delConn = (port) => {
  const tabId = tabIds.get(port);
  if (getConn(tabId, port.name) !== port) return;
  delete connections[key(tabId, port.name)];
};
