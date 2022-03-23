import { memo } from "react";
import { useAtom } from "jotai";
import { selectedRequestAtom } from "../atoms/ui";
import style from "./index.module.scss";
import Tabs from "../../../components/Tabs";
import { useUpdateAtom } from "jotai/utils";
import { updateSidePageStatusAtom } from "../atoms/page";

interface SidePageProps {}
const SidePage: React.FC<SidePageProps> = () => {
  const updateSidePageStatus = useUpdateAtom(updateSidePageStatusAtom);
  return (
    <div className={style["side-page"]}>
      <Tabs
        handleCancelClick={() => {
          updateSidePageStatus(false);
        }}
        tabs={{
          search: {
            label: () => "Search",
            Component: Search,
          },
        }}
      />
    </div>
  );
};
export default memo(SidePage);

const Search = () => {
  return (
    <>
      <div>adsad</div>
      <div>adsad</div>
      <div>adsad</div>
      <div>adsad</div>
      <div>adsad</div>
      <div>adsad</div>
    </>
  );
};
