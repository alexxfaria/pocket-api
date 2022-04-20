import InterestAdsRepository from '@modules/interest/typeorm/repositories/InterestAdsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import AdsRepository from '../typeorm/repositories/AdsRepository';
import PhotoAdsRepository from '../typeorm/repositories/PhotoAdsRepository';

interface IRequest {
  id: string;
}

class DeleteAdsService {
  public async execute({ id }: IRequest): Promise<void> {
    const adsRepository = getCustomRepository(AdsRepository);
    const interestAdsRepository = getCustomRepository(InterestAdsRepository);
    const photoAdsRepository = getCustomRepository(PhotoAdsRepository);
    const ads = await adsRepository.findOne(id);
    if (!ads) {
      throw new AppError('Anúncio não encontrado.');
    }

    const interestAds = await interestAdsRepository.findById(ads.id);
    if (interestAds?.id_ads) {
      throw new AppError('Existe interesse neste anúncio');
    }

    const photoAds = await photoAdsRepository.findById(ads.id);
    if (photoAds?.id_ads) {
      throw new AppError('Existe foto neste anúncio.');
    }

    await adsRepository.remove(ads);
  }
}
export default DeleteAdsService;
