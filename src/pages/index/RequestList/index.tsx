import { useMemo, memo } from "react";
import { atom, useAtom } from "jotai";
import { requestsAtom } from "../atoms/request";
import { filterAtom, searchValueAtom } from "../atoms/setting";
import { selectedRequestKeyAtom } from "../atoms/ui";
import Button from "../../../components/Button";
import style from "./index.module.scss";

interface RequestListProps {}
const RequestList: React.FC<RequestListProps> = () => {
  const [requestList] = useAtom(requestListAtom);
  const [selectedRequestKey, setSelectedRequestKey] = useAtom(
    selectedRequestKeyAtom
  );
  const [isFilterActive] = useAtom(filterAtom);
  const [searchValue] = useAtom(searchValueAtom);
  const memoizedRequestList = useMemo(() => {
    if (searchValue.length === 0 || !isFilterActive) return requestList;
    return requestList.filter(({ servicePath, rpcName }) => {
      return servicePath.includes(searchValue) || rpcName.includes(searchValue);
    });
  }, [isFilterActive, requestList, searchValue]);
  return (
    <div className={style["request-list"]}>
      {memoizedRequestList.map(
        ({ key, servicePath, rpcName, responsePayloads, responseError }) => {
          return (
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
          );
        }
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
    return {
      key,
      servicePath,
      rpcName,
      responsePayloads: get(responsePayloadsAtom),
      responseError,
    };
  });
});
