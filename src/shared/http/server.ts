import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import uploadConfig from '@config/upload';

const app = express();
const port = process.env.API_PORT;
const ip = process.env.TYPEORM_HOST;
const ipExterno = process.env.IP_EXTERNO;

app.use(cors());
app.use(express.json());

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use(errors());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  return res.status(500).json({
    status: 'error',
    message: 'Erro no servidor interno',
    appError: error.message,
  });
});

app.listen(port, () => {
  console.log(`Servidor em execução no ip: ${ip}:${port} ou ${ipExterno}:${port}`);
});
