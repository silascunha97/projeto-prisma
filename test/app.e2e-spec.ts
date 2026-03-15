import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Auth (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) valida payload inválido', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'email-invalido', password: '123' })
      .expect(400);
  });

  it('/auth/login (POST) retorna JWT para credenciais válidas', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'bibliotecario@biblioteca.com', password: 'Senha@123' })
      .expect(201);

    expect(response.body.accessToken).toBeDefined();
  });
});
