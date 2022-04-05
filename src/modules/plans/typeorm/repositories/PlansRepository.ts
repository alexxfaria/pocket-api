import { EntityRepository, Repository } from 'typeorm';
import Plans from '../entities/Plans';

@EntityRepository(Plans)
class PlansRepository extends Repository<Plans> {
  public async findById(id: string): Promise<Plans | undefined> {
    const plans = this.findOne({
      where: {
        id,
      },
    });
    return plans;
  }
}
export default PlansRepository;
