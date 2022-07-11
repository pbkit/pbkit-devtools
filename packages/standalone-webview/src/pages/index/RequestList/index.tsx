import { useMemo, memo } from "react";
import { useAtom } from "jotai";
import { requestListAtom } from "@pbkit-devtools/core/atoms/request";
import {
  filterAtom,
  filterSettingsAtom,
} from "@pbkit-devtools/core/atoms/setting";
import { selectedRequestKeyAtom } from "@pbkit-devtools/core/atoms/ui";
import Button from "@pbkit-devtools/core/components/Button";
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
    const { value, tag, invert } = filterSettings;
    let result = requestList;
    if (!isFilterActive) return result;
    if (value.length > 0) {
      result = result.filter(({ servicePath, rpcName, tags }) => {
        const isFiltered =
          servicePath.includes(value) || rpcName.includes(value);
        return invert ? !isFiltered : isFiltered;
      });
    }
    if (tag.length > 0) {
      result = result.filter(({ tags }) => tags.some((t) => tag.includes(t)));
    }
    return result;
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
