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

interface IStatus {
  active: boolean;
}

class ShowAdsService {
  public async execute({ id }: IRequest): Promise<Ads> {
    const adsRepository = getCustomRepository(AdsRepository);
    const ads = await adsRepository.findById(id);
    if (!ads) {
      throw new AppError('Anúncio não encontrado.');
    }
    return ads;
  }
  public async descriptionid({ description }: IDescription): Promise<Ads> {
    const adsRepository = getCustomRepository(AdsRepository);
    const ads = await adsRepository.findByDesc(description);
    if (!ads) {
      throw new AppError('Anúncio não encontrado.');
    }
    return ads;
  }
  public async status({ active }: IStatus): Promise<Ads> {
    const adsRepository = getCustomRepository(AdsRepository);
    const ads = await adsRepository.findByStatus(active);
    if (!ads) {
      throw new AppError('Anúncio não encontrado.');
    }
    return ads;
  }
}
export default ShowAdsService;
