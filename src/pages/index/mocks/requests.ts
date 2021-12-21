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
    requestPayloadsAtom: atom<RequestPayload[]>([
      { payloadJson: "{}", payloadProto: new Uint8Array([]) },
    ]),
    headerJson: "{}",
    trailerJson: "{}",
    responsePayloadsAtom: atom<ResponsePayload[]>([
      { payloadJson: "{}", payloadProto: new Uint8Array([]) },
    ]),
  }),
  1: atom<Request>({
    servicePath: "foo.bar.MyService",
    rpcName: "MyRpc2",
    metadataJson: "{}",
    tags: [],
    requestPayloadsAtom: atom<RequestPayload[]>([]),
    headerJson: "{}",
    trailerJson: "{}",
    responsePayloadsAtom: atom<ResponsePayload[]>([]),
  }),
};
