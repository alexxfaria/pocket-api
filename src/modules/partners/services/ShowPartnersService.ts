import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Partners from '../typeorm/entities/Partners';
import PartnersRepositories from '../typeorm/repositories/PartnersRepositories';

interface IRequest {
  id: string;
}

class ShowPartnersService {
  public async execute({ id }: IRequest): Promise<Partners> {
    const partnersRepository = getCustomRepository(PartnersRepositories);
    const partners = await partnersRepository.findById(id);
    if (!partners) {
      throw new AppError('Parceiro não encontrado.');
    }
    return partners;
  }
}
export default ShowPartnersService;
