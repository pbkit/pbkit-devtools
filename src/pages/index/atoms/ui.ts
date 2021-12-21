import { atom } from "jotai";
import { requestsAtom } from "./request";

export const selectedRequestIdAtom = atom<string | undefined>(undefined);

export const selectedRequestAtom = atom((get) => {
  const requests = get(requestsAtom);
  const selectedRequestId = get(selectedRequestIdAtom);
  return selectedRequestId ? get(requests[+selectedRequestId]) : undefined;
});
