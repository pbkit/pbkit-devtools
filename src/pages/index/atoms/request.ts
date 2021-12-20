import { atom, PrimitiveAtom } from "jotai";
import type Events from "../../../Events";

export const requestsAtom = atom<Requests>({});

export const updateRequestAtom = atom<null, Events["request"]>(
  null,
  (get, set, update) => {
    const requests = get(requestsAtom);
    const request: Request = {
      ...update,
      requestPayloadsAtom: atom<RequestPayload[]>([]),
      headerJsonAtom: atom<string | undefined>(undefined),
      trailerJsonAtom: atom<string | undefined>(undefined),
      responsePayloadsAtom: atom<ResponsePayload[]>([]),
    };
    set(requestsAtom, {
      ...requests,
      [update.requestId]: atom(request),
    });
  }
);

export const updateRequestPayloadAtom = atom<null, Events["request-payload"]>(
  null,
  (get, set, update) => {
    const requests = get(requestsAtom);
    const request = get(requests[update.requestId]);
    const requestPayloads = get(request.requestPayloadsAtom);
    set(request.requestPayloadsAtom, [...requestPayloads, update]);
  }
);

export const updateResponseAtom = atom<null, Events["response"]>(
  null,
  (get, set, update) => {
    const requests = get(requestsAtom);
    const request = get(requests[update.requestId]);
    set(request.headerJsonAtom, update.headerJson);
  }
);

export const updateResponsePayloadAtom = atom<null, Events["response-payload"]>(
  null,
  (get, set, update) => {
    const requests = get(requestsAtom);
    const request = get(requests[update.requestId]);
    const responsePayloads = get(request.responsePayloadsAtom);
    set(request.responsePayloadsAtom, [...responsePayloads, update]);
  }
);

export const updateResponseTrailerAtom = atom<null, Events["response-trailer"]>(
  null,
  (get, set, update) => {
    const requests = get(requestsAtom);
    const request = get(requests[update.requestId]);
    set(request.trailerJsonAtom, update.trailerJson);
  }
);

export interface Requests {
  [requestId: number]: PrimitiveAtom<Request>;
}

export interface Request {
  servicePath: string;
  rpcName: string;
  metadataJson: string;
  tags: string[];
  requestPayloadsAtom: PrimitiveAtom<RequestPayload[]>;
  headerJsonAtom: PrimitiveAtom<string | undefined>;
  trailerJsonAtom: PrimitiveAtom<string | undefined>;
  responsePayloadsAtom: PrimitiveAtom<ResponsePayload[]>;
}

export interface RequestPayload {
  payloadJson: string;
  payloadProto: Uint8Array;
}

export interface ResponsePayload {
  payloadJson: string;
  payloadProto: Uint8Array;
}
