import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import PhotoAdsRepository from '../typeorm/repositories/PhotoAdsRepository';

interface IRequest {
  id: string;
}

class DeletePhotoAdsService {
  public async execute({ id }: IRequest): Promise<void> {
    const photoAdsRepository = getCustomRepository(PhotoAdsRepository);
    const photoAds = await photoAdsRepository.findOne(id);
    if (!photoAds) {
      throw new AppError('Imagem não encontrado.');
    }

    await photoAdsRepository.remove(photoAds);
  }
}
export default DeletePhotoAdsService;
