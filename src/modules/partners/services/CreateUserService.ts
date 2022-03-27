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

class CreateUserService {
  public async execute({
    name,
    email,
    password,
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
    });

    if (!user.name) {
      throw new AppError('Nome é obrigatório.');
    }
    if (!user.email) {
      throw new AppError('Email é obrigatório.');
    }
    if (!user.phone) {
      throw new AppError('Telefone é obrigatório.');
    }
    if (!user.cnpj_cpf) {
      throw new AppError('CNPJ ou CPF é obrigatório.');
    }
    await usersRepository.save(user);
    return user;
  }
}
export default CreateUserService;
