export default interface Events {
  request: {
    requestId: number;
    servicePath: string;
    rpcName: string;
    metadataJson: string;
    tags: string[];
  };
  "request-payload": {
    requestId: number;
    payloadJson: string;
    payloadProto: Uint8Array;
  };
  response: {
    requestId: number;
    headerJson: string;
  };
  "response-payload": {
    requestId: number;
    payloadJson: string;
    payloadProto: Uint8Array;
  };
  "response-trailer": {
    requestId: number;
    trailerJson: string;
  };
}
