import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import PhotoAds from '../typeorm/entities/PhotoAds';
import AdsRepository from '../typeorm/repositories/AdsRepository';
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
    const adsRepository = getCustomRepository(AdsRepository);
    const photoAds = await photoAdsRepository.findById(id);
    if (!photoAds) {
      throw new AppError('Foto não existe');
    }
    const ads = await adsRepository.findById(id_ads);
    if (!ads) {
      throw new AppError('Anuncio não existe');
    }

    photoAds.photo = photo;
    photoAds.id_ads = id_ads;
    photoAds.active = active;

    const ads = await adsRepository.findById(id_ads);
    if (!ads?.id) {
      throw new AppError('Anúncio não encontrado.');
    }

    await photoAdsRepository.save(photoAds);
    return photoAds;
  }
}
export default UpdatePhotoAdsService;
