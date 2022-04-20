import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import InterestRepository from '../typeorm/repositories/InterestRepository';

interface IRequest {
  id: string;
}

class DeleteInterestService {
  public async execute({ id }: IRequest): Promise<void> {
    const interestRepository = getCustomRepository(InterestRepository);
    const interest = await interestRepository.findOne(id);
    if (!interest) {
      throw new AppError('Interesse não encontrado.');
    }

    await interestRepository.remove(interest);
  }
}
export default DeleteInterestService;
