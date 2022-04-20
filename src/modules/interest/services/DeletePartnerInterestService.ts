import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import PartnerInterestRepository from '../typeorm/repositories/PartnerInterestRepository';

interface IRequest {
  id: string;
}

class DeletePartnerInterestService {
  public async execute({ id }: IRequest): Promise<void> {
    const partnersInterestRepository = getCustomRepository(PartnerInterestRepository);
    const partnersInterest = await partnersInterestRepository.findOne(id);
    if (!partnersInterest) {
      throw new AppError('Não encontrado.');
    }

    await partnersInterestRepository.remove(partnersInterest);
  }
}
export default DeletePartnerInterestService;
