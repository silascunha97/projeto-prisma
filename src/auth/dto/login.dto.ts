import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'bibliotecario@biblioteca.com' })
  email: string;

  @ApiProperty({ example: 'Senha@123' })
  password: string;
}
