import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepositories';

interface IRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  admin: boolean;
  cnpj_cpf: string;
  address: string;
  number: string;
  complements: string;
  district: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  contact: string;
  landline: string;
  stop_ads: boolean;
  all_ads: boolean;
  active: boolean;
}

class UpdateUserService {
  public async execute({
    id,
    name,
    email,
    phone,
    admin,
    cnpj_cpf,
    address,
    number,
    complements,
    district,
    city,
    state,
    country,
    zip,
    contact,
    landline,
    stop_ads,
    all_ads,
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
    user.cnpj_cpf = cnpj_cpf;
    user.address = address;
    user.number = number;
    user.complements = complements;
    user.district = district;
    user.city = city;
    user.state = state;
    user.country = country;
    user.zip = zip;
    user.contact = contact;
    user.landline = landline;
    user.stop_ads = stop_ads;
    user.all_ads = all_ads;
    user.active = active;

    await usersRepository.save(user);
    return user;
  }
}
export default UpdateUserService;
