import { getCustomRepository } from 'typeorm';
import Ads from '../typeorm/entities/Ads';
import AdsRepository from '../typeorm/repositories/AdsRepository';

class ListAdsService {
  public async execute(): Promise<Ads[]> {
    const adsRepository = getCustomRepository(AdsRepository);
    const ads = await adsRepository.find();
    return ads;
  }
}
export default ListAdsService;
