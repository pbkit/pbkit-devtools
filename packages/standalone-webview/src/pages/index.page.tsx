import type { NextPage } from "next";
import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import style from "./index.module.scss";
import Events from "../Events";
import {
  requestsAtom,
  updateRequestAtom,
  updateRequestErrorAtom,
  updateRequestPayloadAtom,
  updateResponseAtom,
  updateResponseErrorAtom,
  updateResponsePayloadAtom,
  updateResponseTrailerAtom,
} from "./index/atoms/request";
import { resetRequestsAtom } from "./index/atoms/ui";
import RequestDetail from "./index/RequestDetail";
import RequestList from "./index/RequestList";
import { preserveLogAtom } from "./index/atoms/setting";
import Settings from "./index/Settings";
import Experimental from "./index/Experimental";
import SidePage from "./index/SidePage";
import { sidePageStatusAtom } from "./index/atoms/page";
import * as FlexLayout from "flexlayout-react";

const json: FlexLayout.IJsonModel = {
  global: {
    borderEnableDrop: false,
  },
  borders: [
    {
      type: "border",
      location: "left",
      selected: 0,
      children: [
        {
          type: "tab",
          enableDrag: false,
          enableClose: false,
          name: "Requests",
          component: "RequestList",
        },
      ],
    },
  ],
  layout: {
    type: "row",
    weight: 100,
    children: [
      {
        id: "RequestDetail",
        type: "tabset",
        weight: 50,
        children: [
          {
            type: "tab",
            enableClose: false,
            name: "Selected",
            component: "RequestDetail",
          },
        ],
      },
    ],
  },
};
const model = FlexLayout.Model.fromJson(json);

const Page: NextPage = () => {
  const layoutRef = useRef<FlexLayout.Layout>(null);
  const [isSidePageOpened] = useAtom(sidePageStatusAtom);
  const [requests] = useAtom(requestsAtom);
  useDevtoolsCommunicationLogic();
  return (
    <div className={style["main-panel"]}>
      {isSidePageOpened === "visible" && (
        <div className={style["side-page"]}>
          <SidePage />
        </div>
      )}
      <div className={style["main-page"]}>
        <div className={style.settings}>
          <Settings />
          {process.env.NODE_ENV === "development" && <Experimental />}
        </div>
        <div style={{ position: "relative", flex: 1 }}>
          <FlexLayout.Layout
            ref={layoutRef}
            model={model}
            factory={(node) => {
              const component = node.getComponent();
              switch (component) {
                case "RequestList": {
                  return (
                    <div className={style["request-list"]}>
                      <RequestList
                        onRequestDragMouseDown={(key, name) => {
                          layoutRef.current?.addTabWithDragAndDrop(name, {
                            id: key,
                            component: "RequestDetail",
                            name,
                          });
                        }}
                      />
                    </div>
                  );
                }
                case "RequestDetail": {
                  const id = node.getId();
                  if (id) {
                    return <RequestDetail requestAtom={requests[id]} />;
                  }
                  return <RequestDetail />;
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
function useDevtoolsCommunicationLogic() {
  const [preserveLog] = useAtom(preserveLogAtom);
  const updateRequest = useUpdateAtom(updateRequestAtom);
  const updateRequestPayload = useUpdateAtom(updateRequestPayloadAtom);
  const updateRequestError = useUpdateAtom(updateRequestErrorAtom);
  const updateResponse = useUpdateAtom(updateResponseAtom);
  const updateResponsePayload = useUpdateAtom(updateResponsePayloadAtom);
  const updateResponseError = useUpdateAtom(updateResponseErrorAtom);
  const updateResponseTrailer = useUpdateAtom(updateResponseTrailerAtom);
  useEffect(() => {
    const server = createServer();
    const { unsubscribe } = server.subscribeMessages(listener);
    function listener(message: Message) {
      switch (message.type) {
        case "request": {
          const event = message.event as Events["request"];
          return updateRequest(event);
        }
        case "request-payload": {
          const event = message.event as Events["request-payload"];
          return updateRequestPayload(event);
        }
        case "request-error": {
          const event = message.event as Events["request-error"];
          return updateRequestError(event);
        }
        case "response": {
          const event = message.event as Events["response"];
          return updateResponse(event);
        }
        case "response-payload": {
          const event = message.event as Events["response-payload"];
          return updateResponsePayload(event);
        }
        case "response-error": {
          const event = message.event as Events["response-error"];
          return updateResponseError(event);
        }
        case "response-trailer": {
          const event = message.event as Events["response-trailer"];
          return updateResponseTrailer(event);
        }
      }
    }
    return () => unsubscribe();
  }, [preserveLog]);
}

function createServer() {
  const server = {
    subscribeMessages(onMessage: (message: Message) => void) {
      const events = new EventSource("/connect");
      const listener = (e: MessageEvent) => {
        const msg = JSON.parse(JSON.parse(e.data)) as Message;
        console.log(msg);
        onMessage(msg);
      };
      events.addEventListener("message", listener);
      return {
        unsubscribe() {
          events.removeEventListener("message", listener);
        },
      };
    },
  };
  return server;
}

interface Message {
  event: Events[keyof Events];
  type: keyof Events;
}

// function useDevtoolsCommunicationLogic() {
//   const resetRequests = useUpdateAtom(resetRequestsAtom);
//   const [preserveLog] = useAtom(preserveLogAtom);
//   const updateRequest = useUpdateAtom(updateRequestAtom);
//   const updateRequestPayload = useUpdateAtom(updateRequestPayloadAtom);
//   const updateRequestError = useUpdateAtom(updateRequestErrorAtom);
//   const updateResponse = useUpdateAtom(updateResponseAtom);
//   const updateResponsePayload = useUpdateAtom(updateResponsePayloadAtom);
//   const updateResponseError = useUpdateAtom(updateResponseErrorAtom);
//   const updateResponseTrailer = useUpdateAtom(updateResponseTrailerAtom);
//   useEffect(() => {
//     createServer();
//     function listener(message: Message) {}
//     try {
//       const port = chrome.runtime.connect({ name: "@pbkit/devtools/panel" });
//       const tabs = chrome.tabs;
//       const tabId = chrome.devtools.inspectedWindow.tabId;
//       port.postMessage({ tabId });
//       interface Message {
//         target: string;
//         event: Events[keyof Events];
//         type: keyof Events;
//       }
//       port.onMessage.addListener((message: Message) => {
//         switch (message.type) {
//           case "request": {
//             const event = message.event as Events["request"];
//             return updateRequest(event);
//           }
//           case "request-payload": {
//             const event = message.event as Events["request-payload"];
//             return updateRequestPayload(event);
//           }
//           case "request-error": {
//             const event = message.event as Events["request-error"];
//             return updateRequestError(event);
//           }
//           case "response": {
//             const event = message.event as Events["response"];
//             return updateResponse(event);
//           }
//           case "response-payload": {
//             const event = message.event as Events["response-payload"];
//             return updateResponsePayload(event);
//           }
//           case "response-error": {
//             const event = message.event as Events["response-error"];
//             return updateResponseError(event);
//           }
//           case "response-trailer": {
//             const event = message.event as Events["response-trailer"];
//             return updateResponseTrailer(event);
//           }
//         }
//       });
//       const listener = (
//         eventTabId: number,
//         changeInfo: chrome.tabs.TabChangeInfo
//       ) => {
//         if (changeInfo.status === "loading" && eventTabId === tabId) {
//           return !preserveLog && resetRequests();
//         }
//       };
//       tabs.onUpdated.addListener(listener);
//       return () => tabs.onUpdated.removeListener(listener);
//     } catch {
//       console.warn("not running on chrome developer tools");
//     }
//   }, [preserveLog]);
// }
