import { Request, Response, NextFunction } from 'express';
import PartnersRepositories from '../../../modules/partners/typeorm/repositories/PartnersRepositories';
import { getCustomRepository } from 'typeorm';

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  const { partners } = req;

  const partnersRepositories = getCustomRepository(PartnersRepositories);

  const partnersAdmin = await partnersRepositories.findOne(partners);

  // Verificar se usuario admin

  if (partnersAdmin?.admin) {
    return next();
  }

  return res.status(401).json({
    error: 'Não autorizado',
  });
}
