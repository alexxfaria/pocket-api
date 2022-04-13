import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Ads from '../typeorm/entities/Ads';
import AdsRepository from '../typeorm/repositories/AdsRepository';

interface IRequest {
  id: string;
}

interface IDescription {
  description: string;
}

class ShowAdsService {
  public async execute({ id }: IRequest): Promise<Ads> {
    const adsRepository = getCustomRepository(AdsRepository);
    const ads = await adsRepository.findOne(id);
    if (!ads) {
      throw new AppError('Anúncio não encontrado.');
    }
    return ads;
  }
  public async descriptionid({ description }: IDescription): Promise<Ads> {
    const adsRepository = getCustomRepository(AdsRepository);
    const ads = await adsRepository.findOne(description);
    if (!ads) {
      throw new AppError('Anúncio não encontrado.');
    }
    return ads;
  }
}
export default ShowAdsService;
