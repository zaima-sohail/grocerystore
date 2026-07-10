

import { JwtPayload } from "jsonwebtoken";

export interface AuthUser extends JwtPayload {
  id: string;
  role?: string;
  email?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export {};

