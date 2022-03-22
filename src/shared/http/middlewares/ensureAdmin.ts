import { Request, Response, NextFunction } from 'express';
import UsersRepository from '../../../modules/users/typeorm/repositories/UsersRepositories';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  admin: boolean;
}

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  const { user } = req;

  const usersRepositories = getCustomRepository(UsersRepository);

  const { admin } = await usersRepositories.findOne(user);

  // Verificar se usuario admin

  if (admin) {
    return next();
  }

  return res.status(401).json({
    error: 'Não autorizado',
  });
}
