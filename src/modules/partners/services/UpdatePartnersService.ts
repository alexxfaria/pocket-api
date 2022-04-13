import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Partners from '../typeorm/entities/Partners';
import PartnersRepositories from '../typeorm/repositories/PartnersRepositories';

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

class UpdatePartnersService {
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
  }: IRequest): Promise<Partners> {
    const partnersRepository = getCustomRepository(PartnersRepositories);
    const partners = await partnersRepository.findById(id);
    if (!partners) {
      throw new AppError('Parceiro não existe.');
    }
    const partnersExists = await partnersRepository.findByName(email);
    const phoneExists = await partnersRepository.findByPhone(phone);

    if (partnersExists && email != partners.email) {
      throw new AppError('Email já esta sendo utilizado.');
    }

    if (phoneExists && phone != partners.phone) {
      throw new AppError('Telefone já esta sendo utilizado.');
    }

    partners.name = name;
    partners.email = email;
    partners.phone = phone;
    partners.admin = admin;
    partners.cnpj_cpf = cnpj_cpf;
    partners.address = address;
    partners.number = number;
    partners.complements = complements;
    partners.district = district;
    partners.city = city;
    partners.state = state;
    partners.country = country;
    partners.zip = zip;
    partners.contact = contact;
    partners.landline = landline;
    partners.stop_ads = stop_ads;
    partners.all_ads = all_ads;
    partners.active = active;

    await partnersRepository.save(partners);
    return partners;
  }
}
export default UpdatePartnersService;
