import { getCustomRepository } from 'typeorm';
import InterestAds from '../typeorm/entities/InterestAds';
import InterestAdsRepository from '../typeorm/repositories/InterestAdsRepository';

interface IRequest {
  id_interest: string;
  id_ads: string;
}

class CreateInterestAdsService {
  public async execute({ id_interest, id_ads }: IRequest): Promise<InterestAds> {
    const interestRepository = getCustomRepository(InterestAdsRepository);
    const interestAds = interestRepository.create({
      id_interest,
      id_ads,
    });
    await interestRepository.save(interestAds);
    return interestAds;
  }
}

export default CreateInterestAdsService;
