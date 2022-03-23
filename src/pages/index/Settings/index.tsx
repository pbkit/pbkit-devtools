import React from "react";
import { useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import Checkbox from "../../../components/Checkbox";
import IconButton from "../../../components/IconButton";
import { resetRequestsAtom } from "../atoms/ui";
import { filterAtom, preserveLogAtom, searchValueAtom } from "../atoms/setting";
import styles from "./index.module.scss";

interface SettingsProps {}
const Settings: React.FC<SettingsProps> = () => {
  const resetRequests = useUpdateAtom(resetRequestsAtom);
  const [preserveLog, setPreserveLog] = useAtom(preserveLogAtom);
  const [searchValue, setSearchValue] = useAtom(searchValueAtom);
  const [isFilterActive, setFilterActive] = useAtom(filterAtom);
  return (
    <div className={styles.settings}>
      <div className={styles["search-section"]}>
        <IconButton icon="clear" onClick={resetRequests} />
        <div className={styles["vertical-sep"]} />
        <Checkbox isChecked={preserveLog} onChange={setPreserveLog}>
          Preserve log
        </Checkbox>
      </div>
      <div className={styles["search-section"]}>
        <IconButton
          icon="filter"
          isActive={isFilterActive}
          onClick={() => setFilterActive((prev) => !prev)}
        />
        <input
          placeholder="Filter (rpc, service path)"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default React.memo(Settings);
