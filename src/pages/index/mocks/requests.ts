import { atom, PrimitiveAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import {
  getRequestKey,
  Request,
  RequestPayload,
  Requests,
  requestsAtom,
  ResponsePayload,
} from "../atoms/request";

interface MockRequest {
  key: string;
  request: PrimitiveAtom<Request>;
}
const getMockRequest = (requestId: number): MockRequest => {
  return {
    key: getRequestKey({ configId: "0", requestId }),
    request: atom<Request>({
      servicePath: "foo.bar.MyService",
      rpcName: `MyRpc${requestId}`,
      metadataJson: "{}",
      tags: [`MyRpcClient-${requestId}`],
      requestPayloadsAtom: atom<RequestPayload[]>([]),
      requestError: undefined,
      headerJson: "{}",
      trailerJson: "{}",
      responsePayloadsAtom: atom<ResponsePayload[]>([]),
      responseError: undefined,
    }),
  };
};

export const useAddMockRequests = () => {
  let _requestId = 0;
  const updateRequests = useUpdateAtom(requestsAtom);
  return (count = 1) => {
    for (let i = 0; i < count; i++) {
      const request = getMockRequest(_requestId++);
      updateRequests((requests) => ({
        ...requests,
        [request.key]: request.request,
      }));
    }
  };
};
