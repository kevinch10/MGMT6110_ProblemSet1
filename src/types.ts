export interface TalkingPoint {
  id: string;
  point: string;
  reason: string;
  source: string;
}

export interface Client {
  id: string;
  clientName: string;
  callTime: string;
  lastContact: string;
  callReason: string;
  statedPriority: string;
  talkingPoints: [TalkingPoint, TalkingPoint, TalkingPoint];
}
