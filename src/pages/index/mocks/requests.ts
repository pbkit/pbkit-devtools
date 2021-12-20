import { atom } from "jotai";
import type {
  Request,
  RequestPayload,
  Requests,
  ResponsePayload,
} from "../atoms/request";

export const requests1: Requests = {
  0: atom<Request>({
    servicePath: "foo.bar.MyService",
    rpcName: "MyRpc1",
    metadataJson: "{}",
    tags: [],
    requestPayloadsAtom: atom<RequestPayload[]>([]),
    headerJsonAtom: atom<string | undefined>("{}"),
    trailerJsonAtom: atom<string | undefined>("{}"),
    responsePayloadsAtom: atom<ResponsePayload[]>([]),
  }),
  1: atom<Request>({
    servicePath: "foo.bar.MyService",
    rpcName: "MyRpc2",
    metadataJson: "{}",
    tags: [],
    requestPayloadsAtom: atom<RequestPayload[]>([]),
    headerJsonAtom: atom<string | undefined>("{}"),
    trailerJsonAtom: atom<string | undefined>("{}"),
    responsePayloadsAtom: atom<ResponsePayload[]>([]),
  }),
};
