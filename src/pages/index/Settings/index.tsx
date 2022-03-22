import React from "react";
import { useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import Button from "../../../components/Button";
import Checkbox from "../../../components/Checkbox";
import { resetRequestsAtom } from "../atoms/ui";
import { preserveLogAtom } from "../atoms/setting";
import styles from "./index.module.scss";
import { useAddMockRequests } from "../mocks/requests";

interface SettingsProps {}
const Settings: React.FC<SettingsProps> = () => {
  const resetRequests = useUpdateAtom(resetRequestsAtom);
  const addMockRequests = useAddMockRequests();
  const [preserveLog, setPreserveLog] = useAtom(preserveLogAtom);
  return (
    <div className={styles.settings}>
      <Button onClick={resetRequests}>Remove cache</Button>
      {process.env.NODE_ENV === "development" && (
        <Button onClick={() => addMockRequests()}>Add mock reqs</Button>
      )}
      <Checkbox
        isChecked={preserveLog}
        onChange={(v) => {
          setPreserveLog(v);
        }}
      >
        Preserve log
      </Checkbox>
    </div>
  );
};

export default React.memo(Settings);
