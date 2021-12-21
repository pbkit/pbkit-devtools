import { memo } from "react";
import { atom, useAtom } from "jotai";
import { selectedRequestAtom } from "../atoms/ui";
import style from "./index.module.scss";
import Tabs from "../../../components/Tabs";

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
  return (
    <>
      <h4>Metadata</h4>
      <pre>{selectedRequest.metadataJson}</pre>
      {requestPayloads.length > 0 && (
        <>
          <h4>Request</h4>
          {requestPayloads.map((payload, index) => (
            <pre key={index}>{payload.payloadJson}</pre>
          ))}
        </>
      )}
    </>
  );
};

const RequestDetailResponse: React.FC = () => {
  const [selectedRequest] = useAtom(selectedRequestAtom);
  if (!selectedRequest) return null;
  const { headerJson, trailerJson } = selectedRequest;
  const [responsePayloads] = useAtom(selectedRequest.responsePayloadsAtom);
  return (
    <>
      {headerJson && (
        <>
          <h4>Header</h4>
          <pre>{headerJson}</pre>
        </>
      )}
      {trailerJson && (
        <>
          <h4>Trailer</h4>
          <pre>{trailerJson}</pre>
        </>
      )}
      {responsePayloads.length > 0 && (
        <>
          <h4>Response</h4>
          {responsePayloads.map((payload, index) => (
            <pre key={index}>{payload.payloadJson}</pre>
          ))}
        </>
      )}
    </>
  );
};
