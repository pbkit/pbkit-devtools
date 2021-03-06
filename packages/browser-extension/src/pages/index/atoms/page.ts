import { atom } from "jotai";
import { searchAtom } from "./setting";

type SidePageStatus = "visible" | "hidden";
export const sidePageStatusAtom = atom<SidePageStatus>("hidden");

export const updateSidePageStatusAtom = atom<null, SidePageStatus>(
  null,
  (_, set, update) => {
    if (update === "hidden") {
      set(searchAtom, false);
    }
    set(sidePageStatusAtom, update);
  }
);
