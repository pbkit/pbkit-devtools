import { useMemo, memo } from "react";
import { useAtom } from "jotai";
import { requestListAtom } from "../atoms/request";
import { filterAtom, filterSettingsAtom } from "../atoms/setting";
import { selectedRequestKeyAtom } from "../atoms/ui";
import Button from "../../../components/Button";
import style from "./index.module.scss";

interface RequestListProps {
  onRequestDragMouseDown: (key: string, rpcName: string) => void;
}
const RequestList: React.FC<RequestListProps> = ({
  onRequestDragMouseDown,
}) => {
  const [requestList] = useAtom(requestListAtom);
  const [selectedRequestKey, setSelectedRequestKey] = useAtom(
    selectedRequestKeyAtom
  );
  const [isFilterActive] = useAtom(filterAtom);
  const [filterSettings] = useAtom(filterSettingsAtom);
  const memoizedRequestList = useMemo(() => {
    const { value, invert } = filterSettings;
    if (value.length === 0 || !isFilterActive) return requestList;
    return requestList.filter(({ servicePath, rpcName }) => {
      const isFiltered = servicePath.includes(value) || rpcName.includes(value);
      return invert ? !isFiltered : isFiltered;
    });
  }, [isFilterActive, requestList, filterSettings]);
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
              <div className={style["list-right"]}>
                <div className={style["list-status"]}>
                  {responsePayloads.length > 0 && (
                    <div className={style["payload-circle"]}>
                      {responsePayloads.length}
                    </div>
                  )}
                  {responseError && <div className={style["error-circle"]} />}
                </div>
                <div
                  className={style["drag-area"]}
                  onMouseDown={() => {
                    onRequestDragMouseDown(key, rpcName);
                  }}
                />
              </div>
            </Button>
          );
        }
      )}
    </div>
  );
};
export default memo(RequestList);
