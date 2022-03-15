import { Request, Response, NextFunction } from 'express';
import UsersRepository from '../../../modules/users/typeorm/repositories/UsersRepositories';
import { getCustomRepository } from 'typeorm';

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const { user } = request;

  const usersRepositories = getCustomRepository(UsersRepository);

  const { admin } = await usersRepositories.findOne(user);

  // Verificar se usuario admin

  if (admin) {
    return next();
  }

  return response.status(401).json({
    error: 'Unauthorized',
  });
}
