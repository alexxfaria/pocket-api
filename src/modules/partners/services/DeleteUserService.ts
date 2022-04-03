import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepositories';

interface IRequest {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findOne(id);
    if (!user) {
      throw new AppError('Parceiro não encontrado.');
    }

    await usersRepository.remove(user);
  }
}
export default DeleteUserService;