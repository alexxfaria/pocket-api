import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Partners from '../typeorm/entities/Partners';
import PartnersRepositories from '../typeorm/repositories/PartnersRepositories';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<Partners> {
    const partnersRepository = getCustomRepository(PartnersRepositories);

    const partners = await partnersRepository.findOne(user_id);

    if (!partners) {
      throw new AppError('Parceiro não encontrado.');
    }
    const partnersExists = await partnersRepository.findByName(email);

    if (partnersExists && partnersExists.id != user_id) {
      throw new AppError('Esse e-mail ja está cadastrado.');
    }

    if (partnersExists && email != partners.email) {
      throw new AppError('Email address already used.');
    }

    if (password && !old_password) {
      throw new AppError('Senha obrigatória.');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, partners.password);

      if (!checkOldPassword) {
        throw new AppError('Senha antiga não confere.');
      }
      partners.password = await hash(password, 8);
    }

    partners.name = name;
    partners.email = email;

    await partnersRepository.save(partners);
    return partners;
  }
}
export default UpdateProfileService;
