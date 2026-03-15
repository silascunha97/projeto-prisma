import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EmprestimosModule } from './emprestimos/emprestimos.module';

@Module({
  imports: [AuthModule, EmprestimosModule],
})
export class AppModule {}
