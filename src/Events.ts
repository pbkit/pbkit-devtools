export default interface Events {
  request: {
    requestId: number;
    configId: string;
    servicePath: string;
    rpcName: string;
    metadataJson: string;
    tags: string[];
  };
  "request-payload": {
    requestId: number;
    configId: string;
    payloadJson: string;
    payloadProto: Uint8Array;
  };
  response: {
    requestId: number;
    configId: string;
    headerJson: string;
  };
  "response-payload": {
    requestId: number;
    configId: string;
    payloadJson: string;
    payloadProto: Uint8Array;
  };
  "response-trailer": {
    requestId: number;
    configId: string;
    trailerJson: string;
  };
}
