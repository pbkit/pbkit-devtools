import { memo } from "react";
import { atom, useAtom } from "jotai";
import { requestsAtom } from "../atoms/request";
import { selectedRequestIdAtom } from "../atoms/ui";
import style from "./index.module.scss";

interface RequestListProps {}
const RequestList: React.FC<RequestListProps> = () => {
  const [requestList] = useAtom(requestListAtom);
  const [selectedRequestId, setSelectedRequestId] = useAtom(
    selectedRequestIdAtom
  );
  return (
    <div className={style["request-list"]}>
      {requestList.map(({ requestId, servicePath, rpcName }) => (
        <div
          key={requestId}
          className={style["request-list-item"]}
          data-selected={requestId === selectedRequestId}
          onClick={() => setSelectedRequestId(requestId)}
        >
          <div className={style["service-path"]}>{servicePath}</div>
          <div className={style["rpc-name"]}>{rpcName}</div>
        </div>
      ))}
    </div>
  );
};
export default memo(RequestList);

const requestListAtom = atom((get) => {
  const requests = get(requestsAtom);
  return Object.keys(requests).map((requestId) => {
    const { servicePath, rpcName } = get(requests[+requestId]);
    return { requestId, servicePath, rpcName };
  });
});
