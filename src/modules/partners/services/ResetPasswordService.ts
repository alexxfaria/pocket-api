import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import PartnersTokenRepository from '../typeorm/repositories/PartnersTokenRepository';
import { isAfter, addHours } from 'date-fns';
import PartnersRepositories from '../typeorm/repositories/PartnersRepositories';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const partnersRepositories = getCustomRepository(PartnersRepositories);
    const partnersTokenRepository = getCustomRepository(PartnersTokenRepository);

    const partnersToken = await partnersTokenRepository.findByToken(token);

    if (!partnersToken) {
      throw new AppError('Token do parceiro não encontrado.');
    }
    const partners = await partnersRepositories.findById(partnersToken.user_id);

    if (!partners) {
      throw new AppError('Parceiro não encontrado.');
    }

    const tokenCreateAt = partnersToken.created_at;
    const compareDate = addHours(tokenCreateAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado');
    }
    const hashedPassword = await hash(password, 8);
    partners.password = hashedPassword;

    await partnersRepositories.save(partners);
  }
}
export default ResetPasswordService;
