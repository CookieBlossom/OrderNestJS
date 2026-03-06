import { Request } from 'express';
export interface RequestUser {
  sub: number;
  email: string;
}

export interface RequestWithUser extends Request {
  user: RequestUser;
}
