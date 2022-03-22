import { memo } from "react";
import { atom, useAtom } from "jotai";
import { requestsAtom } from "../atoms/request";
import { selectedRequestKeyAtom } from "../atoms/ui";
import Button from "../../../components/Button";
import style from "./index.module.scss";

interface RequestListProps {}
const RequestList: React.FC<RequestListProps> = () => {
  const [requestList] = useAtom(requestListAtom);
  const [selectedRequestKey, setSelectedRequestKey] = useAtom(
    selectedRequestKeyAtom
  );
  return (
    <div className={style["request-list"]}>
      {requestList.map(
        ({ key, servicePath, rpcName, responsePayloads, responseError }) => (
          <Button
            key={key}
            className={style["request-list-item"]}
            data-selected={key === selectedRequestKey}
            onClick={() => setSelectedRequestKey(key)}
          >
            <div className={style["list-main"]}>
              <div className={style["service-path"]}>{servicePath}</div>
              <div className={style["rpc-name"]}>{rpcName}</div>
            </div>
            <div className={style["list-status"]}>
              {responsePayloads.length > 0 && (
                <div className={style["payload-circle"]}>
                  {responsePayloads.length}
                </div>
              )}
              {responseError && <div className={style["error-circle"]} />}
            </div>
          </Button>
        )
      )}
    </div>
  );
};
export default memo(RequestList);

const requestListAtom = atom((get) => {
  const requests = get(requestsAtom);
  return Object.keys(requests).map((key) => {
    const { servicePath, rpcName, responsePayloadsAtom, responseError } = get(
      requests[key]
    );
    const responsePayloads = get(responsePayloadsAtom);
    return { key, servicePath, rpcName, responsePayloads, responseError };
  });
});
