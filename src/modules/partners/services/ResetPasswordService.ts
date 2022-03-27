import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import UsersTokenRepository from '../typeorm/repositories/UsersTokenRepository';
import { isAfter, addHours } from 'date-fns';
import UsersRepository from '../typeorm/repositories/UsersRepositories';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const usersTokenRepository = getCustomRepository(UsersTokenRepository);

    const userToken = await usersTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token do parceiro não encontrado.');
    }
    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('Parceiro não encontrado.');
    }

    const tokenCreateAt = userToken.created_at;
    const compareDate = addHours(tokenCreateAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado');
    }
    const hashedPassword = await hash(password, 8);
    user.password = hashedPassword;

    await usersRepository.save(user);
  }
}
export default ResetPasswordService;
