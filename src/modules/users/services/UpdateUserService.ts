import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepositories';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  admin: boolean;
  cnpj: string;
  cpf: string;
  address: string;
  number: string;
  complements: string;
  district: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  active: boolean;
}

class UpdateUserService {
  public async execute({
    id,
    name,
    email,
    password,
    phone,
    admin,
    cnpj,
    cpf,
    address,
    number,
    complements,
    district,
    city,
    state,
    country,
    zip,
    active,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(id);
    if (!user) {
      throw new AppError('Parceiro não existe.');
    }
    const usersExists = await usersRepository.findByName(email);
    const phoneExists = await usersRepository.findByPhone(phone);

    if (usersExists && email != user.email) {
<<<<<<< HEAD
      throw new AppError('Email já esta sendo utilizado.');
=======
      throw new AppError('Email ja esta sendo utilizado.');
    }
    if (phoneExists && phone != user.phone) {
      throw new AppError('Telefone ja esta sendo utilizado.');
>>>>>>> 5f69cbb6d79bce92bd8b9628ff9609f1278e5c69
    }

    const hashedPassword = await hash(password, 8);

    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    user.phone = phone;
    user.admin = admin;
    user.cnpj = cnpj;
    user.cpf = cpf;
    user.address = address;
    user.number = number;
    user.complements = complements;
    user.district = district;
    user.city = city;
    user.state = state;
    user.country = country;
    user.zip = zip;
    user.active = active;

    await usersRepository.save(user);
    return user;
  }
}
export default UpdateUserService;
