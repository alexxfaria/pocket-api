import { Request, Response, NextFunction } from 'express';
import UsersRepository from '../../../modules/partners/typeorm/repositories/UsersRepositories';
import { getCustomRepository } from 'typeorm';

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
