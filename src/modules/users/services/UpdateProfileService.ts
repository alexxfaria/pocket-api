import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepositories';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateProfileService {
  public async execute({ user_id, name, email, password, old_password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }
    const usersExists = await usersRepository.findByName(email);

    if (usersExists && usersExists.id != user_id) {
      throw new AppError('Esse e-mail ja está cadastrado.');
    }

    if (usersExists && email != user.email) {
      throw new AppError('Email address already used.');
    }

    if (password && !old_password) {
      throw new AppError('Senha obrigatória.');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Senha antiga não confere.');
      }
      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);
    return user;
  }
}
export default UpdateProfileService;
