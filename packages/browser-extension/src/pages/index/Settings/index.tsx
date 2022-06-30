import React from "react";
import Select, { ThemeConfig } from "react-select";
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
  updateFilterTagAtom,
} from "../atoms/setting";
import styles from "./index.module.scss";
import { updateSidePageStatusAtom } from "../atoms/page";
import { requestTagsAtom } from "../atoms/request";

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
  const updateSidePageStatus = useUpdateAtom(updateSidePageStatusAtom);
  return (
    <div className={styles["search-section"]}>
      <IconButton icon="clear" onClick={resetRequests} />
      <div className={styles["vertical-sep"]} />
      <IconButton
        icon="search"
        isActive={isSearchActive}
        onClick={() =>
          setSearchActive((prev) => {
            if (!prev) updateSidePageStatus("visible");
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
  const [requestTags] = useAtom(requestTagsAtom);
  const updateFilterValue = useUpdateAtom(updateFilterValueAtom);
  const updateFilterInvert = useUpdateAtom(updateFilterInvertAtom);
  const updateFilterTag = useUpdateAtom(updateFilterTagAtom);
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
      <Select
        className={styles["margin-left"]}
        theme={themeConfig}
        placeholder="Filter by tag..."
        styles={{
          container: (base) => ({ ...base, minWidth: 150 }),
          valueContainer: (base) => ({ ...base, padding: 0 }),
          clearIndicator: (base) => ({ ...base, padding: 0 }),
          dropdownIndicator: (base) => ({ ...base, padding: 0 }),
          control: (base) => ({
            ...base,
            borderTop: "none",
            borderBottom: "none",
            borderRadius: 0,
            minHeight: 0,
            height: "100%",
            padding: "0 2px",
            overflow: "scroll",
            boxShadow: "none",
            borderColor: "var(--pb-sep)",
            ":hover": {
              borderColor: "var(--pb-sep)",
            },
          }),
          menu: (base) => ({ ...base, zIndex: 999 }),
          input: (base) => ({ ...base, boxShadow: "none" }),
        }}
        isMulti
        openMenuOnClick
        hideSelectedOptions={false}
        onChange={(selected) =>
          updateFilterTag(selected.map(({ value }) => value))
        }
        options={[...requestTags.map((tag) => ({ value: tag, label: tag }))]}
      />
    </div>
  );
};

const themeConfig: ThemeConfig = (theme) => ({
  ...theme,
  colors: {
    /*
     * multiValue(remove)/color:hover
     */
    danger: "var(--oc-red-7)",

    /*
     * multiValue(remove)/backgroundColor(focused)
     * multiValue(remove)/backgroundColor:hover
     */
    dangerLight: "var(--oc-red-3)",

    /*
     * control/backgroundColor
     * menu/backgroundColor
     * option/color(selected)
     */
    neutral0: "var(--pb-bg)",

    /*
     * control/backgroundColor(disabled)
     */
    neutral5: "var(--pb-bg-dark)",

    /*
     * control/borderColor(disabled)
     * multiValue/backgroundColor
     * indicators(separator)/backgroundColor(disabled)
     */
    neutral10: "var(--pb-bg-dark)",

    /*
     * control/borderColor
     * option/color(disabled)
     * indicators/color
     * indicators(separator)/backgroundColor
     * indicators(loading)/color
     */
    neutral20: "var(--pb-sep)",

    /*
     * control/borderColor(focused)
     * control/borderColor:hover
     */
    neutral30: "var(--pb-sep)",

    /*
     * menu(notice)/color
     * singleValue/color(disabled)
     * indicators/color:hover
     */
    neutral40: "var(--pb-fg)",

    /*
     * placeholder/color
     */
    neutral50: "var(--pb-fg)",

    /*
     * indicators/color(focused)
     * indicators(loading)/color(focused)
     */
    neutral60: "var(--pb-fg-focus)",

    neutral70: "var(--pb-fg-focus)",

    /*
     * input/color
     * multiValue(label)/color
     * singleValue/color
     * indicators/color(focused)
     * indicators/color:hover(focused)
     */
    neutral80: "var(--pb-fg-focus)",

    neutral90: "var(--pb-fg-focus)",

    /*
     * control/boxShadow(focused)
     * control/borderColor(focused)
     * control/borderColor:hover(focused)
     * option/backgroundColor(selected)
     * option/backgroundColor:active(selected)
     */
    primary: "var(--oc-blue-7)",

    /*
     * option/backgroundColor(focused)
     */
    primary25: "var(--pb-bg-hover)",

    /*
     * option/backgroundColor:active
     */
    primary50: "var(--pb-bg-active)",

    primary75: "var(--pb-bg-active)",
  },
});
