import AdsRepository from '@modules/ads/typeorm/repositories/AdsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import InterestAds from '../typeorm/entities/InterestAds';
import InterestAdsRepository from '../typeorm/repositories/InterestAdsRepository';
import InterestRepository from '../typeorm/repositories/InterestRepository';

interface IRequest {
  id_interest: string;
  id_ads: string;
}

class CreateInterestAdsService {
  public async execute({ id_interest, id_ads }: IRequest): Promise<InterestAds> {
    const interestAdsRepository = getCustomRepository(InterestAdsRepository);
    const adsRepository = getCustomRepository(AdsRepository);
    const interestRepository = getCustomRepository(InterestRepository);

    const interestAds = interestAdsRepository.create({
      id_interest,
      id_ads,
    });
    const ads = await adsRepository.findById(id_ads);
    if (!ads?.id) {
      throw new AppError('Anúncio não encontrado.');
    }
    if (!ads?.active) {
      throw new AppError(`Anúncio ${ads.description} - ${ads.id}  esta inativo.`);
    }

    const interest = await interestRepository.findById(id_interest);
    if (!interest?.id) {
      throw new AppError('Interesse não encontrado.');
    }
    if (!interest?.active) {
      throw new AppError(`Interesse ${interest.name} esta inativo.`);
    }
    await interestAdsRepository.save(interestAds);
    return interestAds;
  }
}

export default CreateInterestAdsService;
