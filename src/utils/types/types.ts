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
    data?: T
}