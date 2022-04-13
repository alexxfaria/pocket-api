import { EntityRepository, Repository } from 'typeorm';
import PhotoAds from '../entities/PhotoAds';

@EntityRepository(PhotoAds)
class PhotoAdsRepository extends Repository<PhotoAds> {
  public async findById(id: string): Promise<PhotoAds | undefined> {
    const photoAds = this.findOne({
      where: {
        id,
      },
    });
    return photoAds;
  }
  public async findByDesc(photo: string): Promise<PhotoAds | undefined> {
    const photoAds = this.findOne({
      where: {
        photo,
      },
    });
    return photoAds;
  }
}
export default PhotoAdsRepository;
