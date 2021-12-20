import { memo } from "react";
import style from "./index.module.scss";

interface RequestDetailProps {}
const RequestDetail: React.FC<RequestDetailProps> = () => {
  return <div className={style["request-detail"]}></div>;
};
export default memo(RequestDetail);
