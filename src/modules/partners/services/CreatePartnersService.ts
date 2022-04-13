import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Partners from '../typeorm/entities/Partners';
import PartnersRepositories from '../typeorm/repositories/PartnersRepositories';

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

class CreatePartnersService {
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
  }: IRequest): Promise<Partners> {
    const partnersRepository = getCustomRepository(PartnersRepositories);
    const emailExists = await partnersRepository.findByEmail(email);
    const phoneExists = await partnersRepository.findByPhone(phone);

    if (emailExists) {
      throw new AppError('Já existe esse e-mail cadastrado.');
    }
    if (phoneExists) {
      throw new AppError('Já existe esse telefone cadastrado.');
    }

    const hashedPassword = await hash(password, 8);

    const partners = partnersRepository.create({
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

    if (!partners.name) {
      throw new AppError('Nome é obrigatório.');
    }
    if (!partners.email) {
      throw new AppError('Email é obrigatório.');
    }
    if (!partners.phone) {
      throw new AppError('Telefone é obrigatório.');
    }
    if (!partners.cnpj_cpf) {
      throw new AppError('CNPJ ou CPF é obrigatório.');
    }
    await partnersRepository.save(partners);
    return partners;
  }
}
export default CreatePartnersService;
