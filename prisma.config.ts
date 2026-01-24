import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env para o process.env
dotenv.config();

// Instancia o PrismaClient com configurações opcionais de log
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'info', 'warn', 'error'] 
    : ['error'],
});

export default prisma;