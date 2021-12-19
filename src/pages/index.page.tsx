import type { NextPage } from "next";
import { useEffect } from "react";

const Page: NextPage = () => {
  useEffect(() => {
    try {
      const port = chrome.runtime.connect({ name: "@pbkit/devtools/panel" });
      port.postMessage({ tabId: chrome.devtools.inspectedWindow.tabId });
      port.onMessage.addListener(console.log);
    } catch {
      console.warn("not running on chrome developer tools");
    }
  }, []);
  return <div>Hello, World!</div>;
};

export default Page;
