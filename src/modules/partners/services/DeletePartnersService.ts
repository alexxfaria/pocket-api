import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import PartnersRepositories from '../typeorm/repositories/PartnersRepositories';

interface IRequest {
  id: string;
}

class DeletePartnersService {
  public async execute({ id }: IRequest): Promise<void> {
    const partnerssRepository = getCustomRepository(PartnersRepositories);
    const partners = await partnerssRepository.findOne(id);
    if (!partners) {
      throw new AppError('Parceiro não encontrado.');
    }

    await partnerssRepository.remove(partners);
  }
}
export default DeletePartnersService;
