import { useAtom } from "jotai";
import React from "react";
import Checkbox from "../../../components/Checkbox";
import { preserveLogAtom } from "../atoms/setting";
import styles from "./index.module.scss";

interface SettingsProps {}
const Settings: React.FC<SettingsProps> = () => {
  const [preserveLog, setPreserveLog] = useAtom(preserveLogAtom);
  return (
    <div className={styles.settings}>
      <Checkbox
        isChecked={preserveLog}
        onChange={(v) => {
          setPreserveLog(v);
          console.log(v);
        }}
      >
        Preserve log
      </Checkbox>
    </div>
  );
};

export default React.memo(Settings);
