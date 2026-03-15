import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/roles.decorator';
import { Role } from '../common/roles.enum';
import { EmprestimosService } from './emprestimos.service';

interface CreateEmprestimoBody {
  livroId: number;
  usuarioId: number;
}

@ApiTags('Empréstimos')
@ApiBearerAuth()
@Controller('emprestimos')
export class EmprestimosController {
  constructor(private readonly emprestimosService: EmprestimosService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.BIBLIOTECARIO, Role.ADMIN)
  @ApiOperation({
    summary:
      'Cria empréstimo (protegido por guard e com validação de regra de negócio no service)',
  })
  create(@Req() req: Request, @Body() body: CreateEmprestimoBody) {
    const user = (req as Request & { user: { id: number; role: Role } }).user;
    return this.emprestimosService.criarEmprestimo(
      user,
      body.livroId,
      body.usuarioId,
    );
  }
}
