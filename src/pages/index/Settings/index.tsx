import React from "react";
import { useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import Button from "../../../components/Button";
import Checkbox from "../../../components/Checkbox";
import { resetRequestsAtom } from "../atoms/ui";
import { preserveLogAtom } from "../atoms/setting";
import styles from "./index.module.scss";

interface SettingsProps {}
const Settings: React.FC<SettingsProps> = () => {
  const resetRequests = useUpdateAtom(resetRequestsAtom);
  const [preserveLog, setPreserveLog] = useAtom(preserveLogAtom);
  return (
    <div className={styles.settings}>
      <Button onClick={resetRequests}>Remove cache</Button>
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
