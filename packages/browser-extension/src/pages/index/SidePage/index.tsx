import { memo, useMemo } from "react";
import { useAtom } from "jotai";
import style from "./index.module.scss";
import Tabs from "@pbkit-devtools/core/components/Tabs";
import { useUpdateAtom } from "jotai/utils";
import { updateSidePageStatusAtom } from "@pbkit-devtools/core/atoms/page";
import {
  requestListAtom,
  RequestListItem,
} from "@pbkit-devtools/core/atoms/request";
import {
  searchSettingsAtom,
  updateSearchCaseAtom,
  updateSearchRegexpAtom,
  updateSearchValueAtom,
} from "@pbkit-devtools/core/atoms/setting";
import Button from "@pbkit-devtools/core/components/Button";
import { selectedRequestKeyAtom } from "@pbkit-devtools/core/atoms/ui";

interface SidePageProps {}
const SidePage: React.FC<SidePageProps> = () => {
  const updateSidePageStatus = useUpdateAtom(updateSidePageStatusAtom);
  return (
    <div className={style["side-page"]}>
      <Tabs
        handleCancelClick={() => {
          updateSidePageStatus("hidden");
        }}
        tabs={{
          search: {
            label: () => "Search",
            Component: Search,
          },
        }}
      />
    </div>
  );
};
export default memo(SidePage);

const SearchMatchTypes = [
  "servicePath",
  "rpcName",
  "request",
  "response",
] as const;
type SearchMatchResult = {
  [P in typeof SearchMatchTypes[number]]: number;
};
const Search = () => {
  const [requestList] = useAtom(requestListAtom);
  const [searchSettings] = useAtom(searchSettingsAtom);
  const updateSearchCase = useUpdateAtom(updateSearchCaseAtom);
  const updateSearchValue = useUpdateAtom(updateSearchValueAtom);
  const updateSearchRegexp = useUpdateAtom(updateSearchRegexpAtom);
  const [selectedRequestKey, setSelectedRequestKey] = useAtom(
    selectedRequestKeyAtom
  );
  const searchedRequestList = useMemo<
    (RequestListItem & { matchResult: SearchMatchResult })[]
  >(() => {
    const { value } = searchSettings;
    if (value.length === 0) return [];
    return requestList
      .map((request) => {
        return { ...request, matchResult: getMatchTypes(request) };
        function getMatchTypes(request: RequestListItem) {
          const { servicePath, rpcName, requestPayloads, responsePayloads } =
            request;
          const result: SearchMatchResult = {
            servicePath: 0,
            rpcName: 0,
            request: 0,
            response: 0,
          };
          result.servicePath += search(servicePath);
          result.rpcName += search(rpcName);
          result.request += requestPayloads.reduce(
            (acc, payload) => (acc += search(payload.payloadJson)),
            0
          );
          result.response += responsePayloads.reduce(
            (acc, payload) => (acc += search(payload.payloadJson)),
            0
          );
          return result;
          function search(target: string) {
            const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const regexp = new RegExp(
              searchSettings.regexp ? value : escapedValue,
              searchSettings.case ? "g" : "gi"
            );
            return [...target.matchAll(regexp)].length;
          }
        }
      })
      .filter((request) =>
        Object.values(request.matchResult).some((v) => v > 0)
      );
  }, [searchSettings]);
  return (
    <div className={style["search-panel"]}>
      <div className={style["search-settings"]}>
        <input
          placeholder="Search"
          className={style["left"]}
          value={searchSettings.value}
          onChange={(e) => updateSearchValue(e.target.value)}
        />
        <Button
          data-selected={searchSettings.case}
          className={style["button-glyph"]}
          onClick={() => updateSearchCase(!searchSettings.case)}
        >
          Aa
        </Button>
        <Button
          data-selected={searchSettings.regexp}
          className={style["button-glyph"]}
          onClick={() => updateSearchRegexp(!searchSettings.regexp)}
        >
          .*
        </Button>
      </div>
      <div className={style["search-list"]}>
        {searchedRequestList.map(
          ({ key, servicePath, rpcName, matchResult }) => {
            return (
              <Button
                key={key}
                className={style["search-list-item"]}
                data-selected={key === selectedRequestKey}
                onClick={() => {
                  setSelectedRequestKey(key);
                }}
              >
                <div className={style["list-main"]}>
                  <div className={style["service-path"]}>{servicePath}</div>
                  <div className={style["rpc-name"]}>{rpcName}</div>
                </div>
                <div>
                  {SearchMatchTypes.map((type) => {
                    if (matchResult && matchResult[type] > 0) {
                      return (
                        <div>
                          On {type} {matchResult[type]}
                        </div>
                      );
                    }
                  })}
                </div>
              </Button>
            );
          }
        )}
      </div>
    </div>
  );
};
