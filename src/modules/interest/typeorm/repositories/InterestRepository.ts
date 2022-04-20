import { EntityRepository, Repository } from 'typeorm';
import Interest from '../entities/Interest';

@EntityRepository(Interest)
class InterestRepository extends Repository<Interest> {
  public async findById(id: string): Promise<Interest | undefined> {
    const interest = this.findOne({
      where: {
        id,
      },
    });
    return interest;
  }
  public async findByName(name: string): Promise<Interest | undefined> {
    const interest = this.findOne({
      where: {
        name,
      },
    });
    return interest;
  }
}
export default InterestRepository;
