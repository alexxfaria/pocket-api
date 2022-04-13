import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import PhotoAds from '../typeorm/entities/PhotoAds';
import PhotoAdsRepository from '../typeorm/repositories/PhotoAdsRepository';

interface IRequest {
  photo: string;
  id_ads: string;
}
class CreatePhotoAdsService {
  public async execute({ photo, id_ads }: IRequest): Promise<PhotoAds> {
    const photoAdsRepository = getCustomRepository(PhotoAdsRepository);
    // const adsExists = await adsRepository.findByDesc(description);

    // if (adsExists) {
    //   throw new AppError('Ja existe um anuncio com a mesma descrição.');
    // }
    const photoAds = photoAdsRepository.create({
      photo,
      id_ads,
    });
    await photoAdsRepository.save(photoAds);
    return photoAds;
  }
}
export default CreatePhotoAdsService;
