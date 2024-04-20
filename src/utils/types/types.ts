export interface IUser {
  createdAt: Date;
  email: string;
  name: string;
  token: string;
  updatedAt: Date;
  _id: string;
}

export interface ICommonResponse<T = any> {
  message: string;
  statusCode: number;
  data?: T;
}
export interface IGroup {
  _id: string;
  name: string;
  groupKey: string;
  isIndividualChat?: boolean;
  members?: string[];
  messages?: IMessage[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMessage {
  _id?: string;
  text: string;
  senderId: string;
  groupId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
