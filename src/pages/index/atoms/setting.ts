import { atom } from "jotai";

export const preserveLogAtom = atom<boolean>(false);

export const searchValueAtom = atom<string>("");

export const filterAtom = atom<boolean>(true);
