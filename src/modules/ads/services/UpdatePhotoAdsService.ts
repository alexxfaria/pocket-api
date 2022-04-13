import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import PhotoAds from '../typeorm/entities/PhotoAds';
import PhotoAdsRepository from '../typeorm/repositories/PhotoAdsRepository';

interface IRequest {
  id: string;
  photo: string;
  id_ads: string;
  active: boolean;
}
class UpdatePhotoAdsService {
  public async execute({ id, photo, id_ads, active }: IRequest): Promise<PhotoAds> {
    const photoAdsRepository = getCustomRepository(PhotoAdsRepository);
    const photoAds = await photoAdsRepository.findById(id);
    if (!photoAds) {
      throw new AppError('Foto não existe');
    }

    photoAds.photo = photo;
    photoAds.id_ads = id_ads;
    photoAds.active = active;

    await photoAdsRepository.save(photoAds);
    return photoAds;
  }
}
export default UpdatePhotoAdsService;
