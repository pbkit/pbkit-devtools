import { atom } from "jotai";
import { requestsAtom } from "./request";

export const selectedRequestKeyAtom = atom<string | undefined>(undefined);

export const selectedRequestAtom = atom((get) => {
  const requests = get(requestsAtom);
  const selectedRequestKey = get(selectedRequestKeyAtom);
  if (!selectedRequestKey) return undefined;
  const selectedRequestAtom = requests[selectedRequestKey];
  return selectedRequestAtom ? get(selectedRequestAtom) : undefined;
});
