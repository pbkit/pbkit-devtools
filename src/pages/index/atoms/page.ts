import { atom } from "jotai";
import { searchAtom } from "./setting";

export const sidePageStatusAtom = atom<boolean>(false);

export const updateSidePageStatusAtom = atom<null, boolean>(
  null,
  (get, set, update) => {
    if (!update) {
      set(searchAtom, update);
    }
    set(sidePageStatusAtom, update);
  }
);
