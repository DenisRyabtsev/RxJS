export interface JsonData {
  channelName: string;
  meterName: string;
  firstRecord: number;
  lastRecord: number;
  recordValues: [{
    Key?: number;
    Value: number;
  }];
}
