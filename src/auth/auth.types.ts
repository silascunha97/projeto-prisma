import { Role } from '../common/roles.enum';

export interface AuthUser {
  id: number;
  email: string;
  password: string;
  role: Role;
}

export interface JwtPayload {
  sub: number;
  email: string;
  role: Role;
}
