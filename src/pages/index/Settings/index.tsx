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
import { sidePageStatusAtom } from "../atoms/page";

interface SettingsProps {}
const Settings: React.FC<SettingsProps> = () => {
  const [isFilterActive] = useAtom(filterAtom);
  return (
    <div className={styles.settings}>
      <MainSettings />
      {isFilterActive && <FilterSettings />}
    </div>
  );
};

export default React.memo(Settings);

const MainSettings = () => {
  const resetRequests = useUpdateAtom(resetRequestsAtom);
  const [preserveLog, setPreserveLog] = useAtom(preserveLogAtom);
  const [isSearchActive, setSearchActive] = useAtom(searchAtom);
  const [isFilterActive, setFilterActive] = useAtom(filterAtom);
  const updateSidePageStatus = useUpdateAtom(sidePageStatusAtom);
  return (
    <div className={styles["search-section"]}>
      <IconButton icon="clear" onClick={resetRequests} />
      <div className={styles["vertical-sep"]} />
      <IconButton
        icon="search"
        isActive={isSearchActive}
        onClick={() =>
          setSearchActive((prev) => {
            if (!prev) updateSidePageStatus(true);
            return true; // Close side-page to disable search
          })
        }
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
  );
};

const FilterSettings = () => {
  const [filterSettings] = useAtom(filterSettingsAtom);
  const updateFilterValue = useUpdateAtom(updateFilterValueAtom);
  const updateFilterInvert = useUpdateAtom(updateFilterInvertAtom);
  return (
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
  );
};
