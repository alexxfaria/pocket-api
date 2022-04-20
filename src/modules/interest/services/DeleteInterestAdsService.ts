import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import InterestAdsRepository from '../typeorm/repositories/InterestAdsRepository';

interface IRequest {
  id: string;
}

class DeleteInterestAdsService {
  public async execute({ id }: IRequest): Promise<void> {
    const interestAdsRepository = getCustomRepository(InterestAdsRepository);
    const interestAds = await interestAdsRepository.findOne(id);
    if (!interestAds) {
      throw new AppError('Não encontrado.');
    }

    await interestAdsRepository.remove(interestAds);
  }
}
export default DeleteInterestAdsService;
