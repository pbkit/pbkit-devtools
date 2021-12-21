import { memo, useMemo, useState } from "react";
import Button from "../Button";
import styles from "./index.module.scss";

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: {
    [tabName: string]: {
      label: () => React.ReactNode;
      Component: React.ComponentType<any>;
    };
  };
}

const Tabs: React.FC<TabsProps> = (props) => {
  const { tabs, ...divProps } = props;
  const tabTypes = useMemo(() => Object.keys(tabs), [tabs]);
  const [currentTabType = tabTypes[0], setCurrentTabType] = useState<string>();
  const Component = tabs[currentTabType]?.Component;
  return (
    <div {...divProps} className={`${styles.tabs} ${props.className ?? ""}`}>
      <div className={styles["tab-bar"]}>
        {tabTypes.map((tabType) => (
          <Button
            key={tabType}
            onClick={() => setCurrentTabType(tabType)}
            data-selected={currentTabType === tabType}
          >
            {tabs[tabType].label()}
          </Button>
        ))}
      </div>
      <div className={styles["panel"]}>{Component && <Component />}</div>
    </div>
  );
};

export default memo(Tabs);
