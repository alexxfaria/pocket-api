import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customers from '../typeorm/entities/Customers';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
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

class CreateCustomerService {
  public async execute({
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
    const customersRepository = getCustomRepository(CustomersRepository);
    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email já esta sendo utilizado.');
    }
    const customers = customersRepository.create({
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
    });
    await customersRepository.save(customers);
    return customers;
  }
}
export default CreateCustomerService;
