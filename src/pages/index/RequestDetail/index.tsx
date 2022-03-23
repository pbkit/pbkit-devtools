import { memo } from "react";
import { useAtom } from "jotai";
import { selectedRequestAtom } from "../atoms/ui";
import style from "./index.module.scss";
import Tabs from "../../../components/Tabs";
import JsonView from "../../../components/JsonView";

interface RequestDetailProps {}
const RequestDetail: React.FC<RequestDetailProps> = () => {
  const [selectedRequest] = useAtom(selectedRequestAtom);
  if (!selectedRequest) {
    return <div className={style["request-detail"]}></div>;
  }
  return (
    <div className={style["request-detail"]}>
      <Tabs
        tabs={{
          request: {
            label: () => "Request",
            Component: RequestDetailRequest,
          },
          response: {
            label: () => "Response",
            Component: RequestDetailResponse,
          },
        }}
      />
    </div>
  );
};
export default memo(RequestDetail);

const RequestDetailRequest: React.FC = () => {
  const [selectedRequest] = useAtom(selectedRequestAtom);
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

const RequestDetailResponse: React.FC = () => {
  const [selectedRequest] = useAtom(selectedRequestAtom);
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
