import type { NextPage } from "next";
import { useEffect } from "react";
import { useUpdateAtom } from "jotai/utils";
import style from "./index.module.scss";
import Events from "../Events";
import { requests1 } from "./index/mocks/requests";
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

const Page: NextPage = () => {
  useDevtoolsCommunicationLogic();
  return (
    <div className={style.page}>
      <RequestList />
      <RequestDetail />
    </div>
  );
};

export default Page;

function useDevtoolsCommunicationLogic() {
  const updateRequests = useUpdateAtom(requestsAtom);
  const updateRequest = useUpdateAtom(updateRequestAtom);
  const updateRequestPayload = useUpdateAtom(updateRequestPayloadAtom);
  const updateResponse = useUpdateAtom(updateResponseAtom);
  const updateResponsePayload = useUpdateAtom(updateResponsePayloadAtom);
  const updateResponseTrailer = useUpdateAtom(updateResponseTrailerAtom);
  useEffect(() => {
    try {
      const port = chrome.runtime.connect({ name: "@pbkit/devtools/panel" });
      port.postMessage({ tabId: chrome.devtools.inspectedWindow.tabId });
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
    } catch {
      console.warn("not running on chrome developer tools");
      updateRequests(requests1);
    }
  }, []);
}
