import type { NextPage } from "next";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import style from "./index.module.scss";
import Events from "../Events";
import {
  requestsAtom,
  updateRequestAtom,
  updateRequestPayloadAtom,
  updateResponseAtom,
  updateResponsePayloadAtom,
  updateResponseTrailerAtom,
} from "./index/atoms/request";
import RequestDetail from "./index/RequestDetail";
import RequestList from "./index/RequestList";
import { preserveLogAtom } from "./index/atoms/setting";
import Settings from "./index/Settings";
import { selectedRequestKeyAtom } from "./index/atoms/ui";

const Page: NextPage = () => {
  useDevtoolsCommunicationLogic();
  return (
    <div className={style.page}>
      <div className={style.sidebar}>
        <Settings />
        <RequestList />
      </div>
      <RequestDetail />
    </div>
  );
};

export default Page;

function useDevtoolsCommunicationLogic() {
  const updateRequests = useUpdateAtom(requestsAtom);
  const [, setSelectedRequestKey] = useAtom(selectedRequestKeyAtom);
  const resetRequests = () => {
    setSelectedRequestKey(undefined);
    updateRequests({});
  };
  const [preserveLog] = useAtom(preserveLogAtom);
  const updateRequest = useUpdateAtom(updateRequestAtom);
  const updateRequestPayload = useUpdateAtom(updateRequestPayloadAtom);
  const updateResponse = useUpdateAtom(updateResponseAtom);
  const updateResponsePayload = useUpdateAtom(updateResponsePayloadAtom);
  const updateResponseTrailer = useUpdateAtom(updateResponseTrailerAtom);
  useEffect(() => {
    try {
      const port = chrome.runtime.connect({ name: "@pbkit/devtools/panel" });
      const tabs = chrome.tabs;
      const tabId = chrome.devtools.inspectedWindow.tabId;
      port.postMessage({ tabId });
      interface Message {
        target: string;
        event: Events[keyof Events];
        type: keyof Events;
      }
      port.onMessage.addListener((message: Message) => {
        switch (message.type) {
          case "request": {
            const event = message.event as Events["request"];
            return updateRequest(event);
          }
          case "request-payload": {
            const event = message.event as Events["request-payload"];
            return updateRequestPayload(event);
          }
          case "response": {
            const event = message.event as Events["response"];
            return updateResponse(event);
          }
          case "response-payload": {
            const event = message.event as Events["response-payload"];
            return updateResponsePayload(event);
          }
          case "response-trailer": {
            const event = message.event as Events["response-trailer"];
            return updateResponseTrailer(event);
          }
        }
      });
      const listener = (
        eventTabId: number,
        changeInfo: chrome.tabs.TabChangeInfo
      ) => {
        if (changeInfo.status === "loading" && eventTabId === tabId) {
          return !preserveLog && resetRequests();
        }
      };
      tabs.onUpdated.addListener(listener);
      return () => tabs.onUpdated.removeListener(listener);
    } catch {
      console.warn("not running on chrome developer tools");
    }
  }, [preserveLog]);
}
