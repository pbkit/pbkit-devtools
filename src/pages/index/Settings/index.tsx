import React from "react";
import { useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import Checkbox from "../../../components/Checkbox";
import IconButton from "../../../components/IconButton";
import { resetRequestsAtom } from "../atoms/ui";
import {
  filterAtom,
  preserveLogAtom,
  filterSettingsAtom,
  searchAtom,
  updateFilterValueAtom,
  updateFilterInvertAtom,
} from "../atoms/setting";
import styles from "./index.module.scss";

interface SettingsProps {}
const Settings: React.FC<SettingsProps> = () => {
  const resetRequests = useUpdateAtom(resetRequestsAtom);
  const [preserveLog, setPreserveLog] = useAtom(preserveLogAtom);
  const [isSearchActive, setSearchActive] = useAtom(searchAtom);
  const [isFilterActive, setFilterActive] = useAtom(filterAtom);
  const [filterSettings] = useAtom(filterSettingsAtom);
  const updateFilterValue = useUpdateAtom(updateFilterValueAtom);
  const updateFilterInvert = useUpdateAtom(updateFilterInvertAtom);
  return (
    <div className={styles.settings}>
      <div className={styles["search-section"]}>
        <IconButton icon="clear" onClick={resetRequests} />
        <div className={styles["vertical-sep"]} />
        <IconButton
          icon="search"
          isActive={isSearchActive}
          onClick={() => setSearchActive((prev) => !prev)}
        />
        <IconButton
          icon="filter"
          isActive={isFilterActive}
          onClick={() => setFilterActive((prev) => !prev)}
        />
        <div className={styles["vertical-sep"]} />
        <Checkbox
          className={styles["margin-left"]}
          isChecked={preserveLog}
          onChange={setPreserveLog}
        >
          Preserve log
        </Checkbox>
      </div>
      {isFilterActive && (
        <div className={styles["search-section"]}>
          <input
            className={styles["filter-input"]}
            placeholder="Filter (rpc, service path)"
            value={filterSettings.value}
            onChange={(e) => updateFilterValue(e.target.value)}
          />
          <Checkbox
            className={styles["margin-left"]}
            isChecked={filterSettings.invert}
            onChange={updateFilterInvert}
          >
            Invert
          </Checkbox>
        </div>
      )}
    </div>
  );
};

export default React.memo(Settings);
