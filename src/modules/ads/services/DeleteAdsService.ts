import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import AdsRepository from '../typeorm/repositories/AdsRepository';

interface IRequest {
  id: string;
}

class DeleteAdsService {
  public async execute({ id }: IRequest): Promise<void> {
    const adsRepository = getCustomRepository(AdsRepository);
    const ads = await adsRepository.findOne(id);
    if (!ads) {
      throw new AppError('Anúncio não encontrado.');
    }

    await adsRepository.remove(ads);
  }
}
export default DeleteAdsService;
