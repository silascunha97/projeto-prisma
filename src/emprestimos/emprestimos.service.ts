import { ForbiddenException, Injectable } from '@nestjs/common';
import { Role } from '../common/roles.enum';

@Injectable()
export class EmprestimosService {
  criarEmprestimo(actor: { id: number; role: Role }, livroId: number, usuarioId: number) {
    if (actor.role !== Role.BIBLIOTECARIO && actor.role !== Role.ADMIN) {
      throw new ForbiddenException(
        'Regra de negócio: apenas bibliotecário/admin pode registrar empréstimo',
      );
    }

    return {
      id: Date.now(),
      livroId,
      usuarioId,
      bibliotecarioId: actor.id,
      status: 'EMPRESTADO',
    };
  }
}
