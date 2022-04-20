import { EntityRepository, Repository } from 'typeorm';
import Ads from '../entities/Ads';

@EntityRepository(Ads)
class AdsRepository extends Repository<Ads> {
  public async findById(id: string): Promise<Ads | undefined> {
    const ads = this.findOne({
      where: {
        id,
      },
    });
    return ads;
  }

  public async findByDesc(description: string): Promise<Ads | undefined> {
    const ads = this.findOne({
      where: {
        description,
      },
    });
    return ads;
  }
}
export default AdsRepository;
