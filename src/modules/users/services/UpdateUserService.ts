import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepositories';

interface IRequest {
  id: string;
  name: string;
  email: string;
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
      throw new AppError('Email já esta sendo utilizado.');
    }

    if (phoneExists && email != user.phone) {
      throw new AppError('Telefone já esta sendo utilizado.');
    }

    user.name = name;
    user.email = email;
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
