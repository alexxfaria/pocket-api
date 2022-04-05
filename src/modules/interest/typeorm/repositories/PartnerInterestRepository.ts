import { EntityRepository, Repository } from 'typeorm';
import PartnerInterest from '../entities/PartnerInterest';

@EntityRepository(PartnerInterest)
class PartnerInterestRepository extends Repository<PartnerInterest> {
  public async findById(id: string): Promise<PartnerInterest | undefined> {
    const partnerInterest = this.findOne({
      where: {
        id,
      },
    });
    return partnerInterest;
  }
}
export default PartnerInterestRepository;
