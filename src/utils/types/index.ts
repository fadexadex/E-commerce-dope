import { Prisma } from "@prisma/client";


declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export interface ILoginBody {
  email: string;
  password: string;
}

export type TokenPayload = Omit<Prisma.UserCreateInput, "password">;