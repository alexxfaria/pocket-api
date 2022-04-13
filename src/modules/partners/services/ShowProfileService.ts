import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Partners from '../typeorm/entities/Partners';
import PartnersRepositories from '../typeorm/repositories/PartnersRepositories';

interface IRequest {
  user_id: string;
}

class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<Partners> {
    const partnersRepositories = getCustomRepository(PartnersRepositories);
    const partners = await partnersRepositories.findById(user_id);
    if (!partners) {
      throw new AppError('Parceiro não encontrado');
    }
    return partners;
  }
}
export default ShowProfileService;
