import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepositories';

interface IRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  admin: boolean;
  cnpj?: string;
  cpf?: string;
  address?: string;
  number?: string;
  complements?: string;
  district?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  active?: boolean;
}

class CreateUserService {
  public async execute({ name, email, password, phone, admin }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const emailExists = await usersRepository.findByEmail(email);
    const phoneExists = await usersRepository.findByPhone(phone);

    if (emailExists) {
      throw new AppError('Já existe esse e-mail cadastrado.');
    }
    if (phoneExists) {
      throw new AppError('Já existe esse telefone cadastrado.');
    }
    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      phone,
      admin,
    });
    await usersRepository.save(user);
    return user;
  }
}
export default CreateUserService;
