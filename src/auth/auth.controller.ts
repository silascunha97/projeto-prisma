import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login por e-mail e senha com retorno de JWT Bearer' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: LoginResponseDto })
  @ApiUnauthorizedResponse({ description: 'Credenciais inválidas' })
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @Get('oauth/:provider')
  @ApiOperation({ summary: 'Guia para integração Auth.js (Google / Apple ID)' })
  @ApiParam({ name: 'provider', enum: ['google', 'apple'] })
  getAuthJsProviderInfo(@Param('provider') provider: string) {
    if (provider !== 'google' && provider !== 'apple') {
      throw new BadRequestException('Provider suportado: google ou apple');
    }

    return this.authService.getOAuthProviderUrl(provider);
  }
}
