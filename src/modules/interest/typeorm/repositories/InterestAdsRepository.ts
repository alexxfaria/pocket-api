import { EntityRepository, Repository } from 'typeorm';
import InterestAds from '../entities/InterestAds';

@EntityRepository(InterestAds)
class InterestAdsRepository extends Repository<InterestAds> {
  public async findById(id: string): Promise<InterestAds | undefined> {
    const interestAds = this.findOne({
      where: {
        id,
      },
    });
    return interestAds;
  }
}
export default InterestAdsRepository;
