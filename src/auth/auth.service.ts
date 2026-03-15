import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'crypto';
import { Role } from '../common/roles.enum';
import { AuthUser, JwtPayload } from './auth.types';

@Injectable()
export class AuthService {
  private readonly users: AuthUser[] = [
    {
      id: 1,
      email: 'bibliotecario@biblioteca.com',
      password: 'Senha@123',
      role: Role.BIBLIOTECARIO,
    },
    {
      id: 2,
      email: 'leitor@biblioteca.com',
      password: 'Senha@123',
      role: Role.LEITOR,
    },
  ];

  private readonly jwtSecret = process.env.JWT_SECRET ?? 'dev-secret';

  login(email: string, password: string) {
    if (!email || !password || !email.includes('@') || password.length < 6) {
      throw new BadRequestException('Payload de login inválido');
    }

    const user = this.users.find((u) => u.email === email);
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: this.signJwt(payload),
    };
  }

  validateToken(token: string) {
    const [encodedHeader, encodedPayload, signature] = token.split('.');
    if (!encodedHeader || !encodedPayload || !signature) {
      throw new UnauthorizedException('Token JWT inválido');
    }

    const data = `${encodedHeader}.${encodedPayload}`;
    const expectedSignature = this.base64UrlEncode(
      createHmac('sha256', this.jwtSecret).update(data).digest('base64'),
    );

    const incoming = Buffer.from(signature);
    const expected = Buffer.from(expectedSignature);

    if (
      incoming.length !== expected.length ||
      !timingSafeEqual(incoming, expected)
    ) {
      throw new UnauthorizedException('Assinatura JWT inválida');
    }

    const payloadJson = Buffer.from(encodedPayload, 'base64url').toString('utf-8');
    const payload = JSON.parse(payloadJson) as JwtPayload & { exp: number };

    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      throw new UnauthorizedException('Token JWT expirado');
    }

    return this.validateUserById(payload.sub);
  }

  validateUserById(userId: number) {
    const user = this.users.find((u) => u.id === userId);
    if (!user) {
      throw new UnauthorizedException('Usuário do token não encontrado');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }

  getOAuthProviderUrl(provider: 'google' | 'apple') {
    const providerUrls = {
      google: 'https://authjs.dev/getting-started/providers/google',
      apple: 'https://authjs.dev/getting-started/providers/apple',
    };

    return {
      provider,
      authJsSetupGuide: providerUrls[provider],
      note: 'Integre no frontend com Auth.js e envie o JWT Bearer recebido no /auth/login para APIs protegidas.',
    };
  }

  private signJwt(payload: JwtPayload) {
    const header = { alg: 'HS256', typ: 'JWT' };
    const now = Math.floor(Date.now() / 1000);
    const body = { ...payload, iat: now, exp: now + 3600 };

    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
    const encodedBody = Buffer.from(JSON.stringify(body)).toString('base64url');
    const data = `${encodedHeader}.${encodedBody}`;

    const signature = this.base64UrlEncode(
      createHmac('sha256', this.jwtSecret).update(data).digest('base64'),
    );

    return `${data}.${signature}`;
  }

  private base64UrlEncode(base64Value: string) {
    return base64Value.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  }
}
