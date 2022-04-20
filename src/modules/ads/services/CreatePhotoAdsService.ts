import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import PhotoAds from '../typeorm/entities/PhotoAds';
import AdsRepository from '../typeorm/repositories/AdsRepository';
import PhotoAdsRepository from '../typeorm/repositories/PhotoAdsRepository';

interface IRequest {
  photo: string;
  id_ads: string;
}
class CreatePhotoAdsService {
  public async execute({ photo, id_ads }: IRequest): Promise<PhotoAds> {
    const photoAdsRepository = getCustomRepository(PhotoAdsRepository);
    const adsRepository = getCustomRepository(AdsRepository);

    const photoAds = photoAdsRepository.create({
      photo,
      id_ads,
    });

    const ads = await adsRepository.findById(id_ads);
    if (!ads?.id) {
      throw new AppError('Anúncio não encontrado.');
    }
    await photoAdsRepository.save(photoAds);
    return photoAds;
  }
}
export default CreatePhotoAdsService;
