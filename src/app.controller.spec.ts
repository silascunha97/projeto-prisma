import { ForbiddenException } from '@nestjs/common';
import { EmprestimosService } from './emprestimos/emprestimos.service';
import { Role } from './common/roles.enum';

describe('EmprestimosService', () => {
  const service = new EmprestimosService();

  it('permite empréstimo para bibliotecário', () => {
    const result = service.criarEmprestimo(
      { id: 1, role: Role.BIBLIOTECARIO },
      10,
      20,
    );

    expect(result.status).toBe('EMPRESTADO');
  });

  it('bloqueia empréstimo para leitor (validação de service layer)', () => {
    expect(() =>
      service.criarEmprestimo({ id: 2, role: Role.LEITOR }, 10, 20),
    ).toThrow(ForbiddenException);
  });
});
