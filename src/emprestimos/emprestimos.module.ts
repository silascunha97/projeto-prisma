import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { EmprestimosController } from './emprestimos.controller';
import { EmprestimosService } from './emprestimos.service';

@Module({
  imports: [AuthModule],
  controllers: [EmprestimosController],
  providers: [EmprestimosService, JwtAuthGuard, RolesGuard],
})
export class EmprestimosModule {}
