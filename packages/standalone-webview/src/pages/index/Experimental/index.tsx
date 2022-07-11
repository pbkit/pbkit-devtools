import React from "react";
import Button from "@pbkit-devtools/core/components/Button";
import styles from "./index.module.scss";
import { useAddMockRequests } from "../mocks/requests";

interface ExperimentalProps {}
const Experimental: React.FC<ExperimentalProps> = () => {
  const addMockRequests = useAddMockRequests();
  return (
    <div className={styles.settings}>
      <Button onClick={() => addMockRequests()}>Add mock reqs</Button>
    </div>
  );
};

export default React.memo(Experimental);
