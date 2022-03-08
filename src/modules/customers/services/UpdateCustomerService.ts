import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customers from '../typeorm/entities/Customers';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  cnpj: string;
  cpf: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
  cep: string;
}

class UpdateCustomerService {
  public async execute({
    id,
    name,
    email,
    cnpj,
    cpf,
    logradouro,
    numero,
    complemento,
    bairro,
    cidade,
    estado,
    pais,
    cep,
  }: IRequest): Promise<Customers> {
    const customerRepository = getCustomRepository(CustomersRepository);
    const customer = await customerRepository.findOne(id);
    if (!customer) {
      throw new AppError('Parceiro não existe.');
    }
    const usersExists = await customerRepository.findByName(email);

    if (usersExists && email != customer.email) {
      throw new AppError('Email já esta sendo utilizado.');
    }

    customer.name = name;
    customer.email = email;
    customer.cnpj = cnpj;
    customer.cpf = cpf;
    customer.logradouro = logradouro;
    customer.numero = numero;
    customer.complemento = complemento;
    customer.bairro = bairro;
    customer.cidade = cidade;
    customer.estado = estado;
    customer.pais = pais;
    customer.cep = cep;

    await customerRepository.save(customer);
    return customer;
  }
}
export default UpdateCustomerService;
