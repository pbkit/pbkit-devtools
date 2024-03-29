import { memo } from "react";
import { Atom, useAtom } from "jotai";
import { selectedRequestAtom } from "@pbkit-devtools/core/atoms/ui";
import { Request } from "@pbkit-devtools/core/atoms/request";
import style from "./index.module.scss";
import Tabs from "@pbkit-devtools/core/components/Tabs";
import JsonView from "@pbkit-devtools/core/components/JsonView";

interface RequestDetailProps {
  requestAtom?: Atom<Request | undefined>;
}
const RequestDetail: React.FC<RequestDetailProps> = ({
  requestAtom = selectedRequestAtom,
}) => {
  const [selectedRequest] = useAtom(requestAtom);
  console.log(selectedRequest);
  if (!selectedRequest) {
    return <div className={style["request-detail"]}></div>;
  }
  return (
    <div className={style["request-detail"]}>
      <Tabs
        tabs={{
          request: {
            label: () => "Request",
            Component: () => <RequestDetailRequest requestAtom={requestAtom} />,
          },
          response: {
            label: () => "Response",
            Component: () => (
              <RequestDetailResponse requestAtom={requestAtom} />
            ),
          },
        }}
      />
    </div>
  );
};
export default memo(RequestDetail);

const RequestDetailRequest: React.FC<RequestDetailProps> = ({
  requestAtom = selectedRequestAtom,
}) => {
  const [selectedRequest] = useAtom(requestAtom);
  if (!selectedRequest) return null;
  const [requestPayloads] = useAtom(selectedRequest.requestPayloadsAtom);
  const { requestError } = selectedRequest;
  return (
    <div className={style["panel"]}>
      <h4>Metadata</h4>
      <JsonView src={JSON.parse(selectedRequest.metadataJson)} />
      {requestPayloads.length > 0 && (
        <>
          <h4>Request</h4>
          {requestPayloads.map((payload, index) => (
            <JsonView src={JSON.parse(payload.payloadJson)} key={index} />
          ))}
        </>
      )}
      {requestError && (
        <>
          <h4>RequestError</h4>
          <p className={style["request-detail--paragraph"]}>
            {requestError.errorMessage}
          </p>
        </>
      )}
    </div>
  );
};

const RequestDetailResponse: React.FC<RequestDetailProps> = ({
  requestAtom = selectedRequestAtom,
}) => {
  const [selectedRequest] = useAtom(requestAtom);
  if (!selectedRequest) return null;
  const { headerJson, trailerJson, responseError } = selectedRequest;
  const [responsePayloads] = useAtom(selectedRequest.responsePayloadsAtom);
  return (
    <div className={style["panel"]}>
      {headerJson && (
        <>
          <h4>Header</h4>
          <JsonView src={JSON.parse(headerJson)} />
        </>
      )}
      {trailerJson && (
        <>
          <h4>Trailer</h4>
          <JsonView src={JSON.parse(trailerJson)} />
        </>
      )}
      {responsePayloads.length > 0 && (
        <>
          <h4>Response</h4>
          {responsePayloads.map((payload, index) => (
            <JsonView src={JSON.parse(payload.payloadJson)} key={index} />
          ))}
        </>
      )}
      {responseError && (
        <>
          <h4>ResponseError</h4>
          <p className={style["request-detail--paragraph"]}>
            {responseError.errorMessage}
          </p>
        </>
      )}
    </div>
  );
};
