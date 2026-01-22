<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

# 📚 Biblioteca API — NestJS + Prisma

API REST para gerenciamento de biblioteca com **empréstimos**, **controle de acesso por papel (RBAC)** e **modelagem orientada a domínio**, construída com **NestJS**, **Prisma** e **PostgreSQL**.

---

## 🎯 Objetivo

Fornecer uma API robusta para:

- Cadastro e consulta de livros
- Cadastro e gestão de usuários
- Controle de empréstimos e devoluções
- Auditoria de ações realizadas por bibliotecários
- Autenticação JWT e autorização baseada em papéis

A regra central do domínio é **simples e inegociável**:

> ❗ Um empréstimo **só pode ser realizado por um usuário com papel de BIBLIOTECÁRIO**.

---

## 🧠 Conceitos Arquiteturais

Esta aplicação segue princípios sólidos de engenharia de software:

- **RESTful API**
- **Arquitetura em Camadas**
- **Domain-Driven Design (DDD simplificado)**
- **Programação Orientada a Objetos (OOP)**
- **ORM (Object-Relational Mapping)** com Prisma
- **RBAC (Role-Based Access Control)**

### Camadas

```
src/
├── auth/            # Autenticação e JWT
├── users/           # Usuários e perfis
├── livros/          # Catálogo de livros
├── emprestimos/     # Regras de empréstimo
├── prisma/          # PrismaService e schema
└── common/          # Guards, decorators, roles
```

---

## 🗂️ Modelo de Domínio

### Entidades Principais

- **Usuario**
- **Perfil** (Role)
- **Livro**
- **Emprestimo**

### Relacionamentos (UML)

- Um **Usuário** pode ter vários **Empréstimos**
- Um **Livro** pode participar de vários **Empréstimos** (ao longo do tempo)
- Um **Empréstimo** referencia:
  - o **Usuário Leitor**
  - o **Livro**
  - o **Usuário Bibliotecário** que autorizou a ação

---

## 🧩 Regras de Negócio Essenciais

### Empréstimo

- Só pode ser criado se:
  - Livro estiver disponível
  - Usuário estiver ativo
  - Usuário autenticado possuir `ROLE_BIBLIOTECARIO`

- O empréstimo **não é deletado**
- A devolução altera o estado do empréstimo

### Devolução

- Atualiza a data de devolução real
- Pode calcular multa (caso exista atraso)

---

## 🔐 Autenticação e Autorização

### Autenticação

- JWT Bearer Token
- Login via email e senha

### Autorização (RBAC)

Papéis suportados:

- `ROLE_LEITOR`
- `ROLE_BIBLIOTECARIO`
- `ROLE_ADMIN` (opcional)

Proteção em **duas camadas**:

1. **Guards de rota (NestJS)**
2. **Validação explícita no Service Layer**

> Mesmo que um endpoint seja exposto incorretamente, a regra de negócio ainda bloqueia a operação.

---

## 🔑 Exemplo de Fluxo de Empréstimo

1. Bibliotecário autentica-se
2. Token JWT é enviado na requisição
3. Controller valida token
4. Service verifica:
   - Role do usuário
   - Disponibilidade do livro
   - Estado do leitor
5. Empréstimo é criado
6. Livro é marcado como indisponível
7. ID do bibliotecário é salvo para auditoria

---

## 🗃️ Prisma — Modelo de Dados (Exemplo)

```prisma
model Livro {
  id                  Int    @id @default(autoincrement())
  titulo              String
  autor               String
  genero              String
  totalCopias         Int
  copiasDisponiveis   Int

  emprestimos Emprestimo[]
}
model Emprestimo {
  id              Int      @id @default(autoincrement())
  dataEmprestimo  DateTime
  dataDevolucao   DateTime?

  livroId         Int
  livro           Livro @relation(fields: [livroId], references: [id])

  usuarioId       Int
  usuario         Usuario @relation("UsuarioEmprestimo", fields: [usuarioId], references: [id])

  bibliotecarioId Int
  bibliotecario   Usuario @relation("BibliotecarioEmprestimo", fields: [bibliotecarioId], references: [id])
}
model Perfil {
  id        Int      @id @default(autoincrement())
  nome      String   @unique
  usuarios  Usuario[]
}

model Usuario {
  id        Int      @id @default(autoincrement())
  nome      String
  email     String   @unique
  ativo     Boolean  @default(true)

  perfilId  Int
  perfil    Perfil @relation(fields: [perfilId], references: [id])

  // Empréstimos em que o usuário é o LEITOR (aluno/docente)
  emprestimosComoUsuario Emprestimo[] @relation("UsuarioEmprestimo")

  // Empréstimos em que o usuário é o BIBLIOTECÁRIO
  emprestimosComoBibliotecario Emprestimo[] @relation("BibliotecarioEmprestimo")
}


```

---

## 📡 Endpoints Principais

### Autenticação

| Método | Rota | Descrição |
|------|------|-----------|
| POST | /auth/login | Login e geração de JWT |

### Livros

| Método | Rota | Permissão |
|------|------|-----------|
| GET | /livros | Público |
| POST | /livros | Bibliotecário |

### Empréstimos

| Método | Rota | Permissão |
|------|------|-----------|
| POST | /emprestimos | Bibliotecário |
| PUT | /emprestimos/:id/devolver | Bibliotecário |

---

## 🧪 Testabilidade

- Services testáveis com mocks de repositório
- Regras de negócio isoladas do framework
- Prisma desacoplado da lógica de domínio

---

## 🚀 Tecnologias

- **Node.js**
- **NestJS**
- **Prisma ORM**
- **PostgreSQL**
- **JWT**
- **Docker** (opcional)

---

## 📌 Conclusão

Este projeto não é apenas uma API CRUD.

Ele demonstra:

- Disciplina arquitetural
- Separação clara de responsabilidades
- Segurança aplicada como regra de negócio
- Domínio rico e expressivo

Se você quebrar uma camada, o sistema continua íntegro.

Esse é o objetivo.
