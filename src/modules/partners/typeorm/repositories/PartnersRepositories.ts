import { EntityRepository, Repository } from 'typeorm';
import Partners from '../entities/Partners';

@EntityRepository(Partners)
class PartnersRepositories extends Repository<Partners> {
  public async findByName(name: string): Promise<Partners | undefined> {
    const partners = this.findOne({
      where: {
        name,
      },
    });
    return partners;
  }

  public async findById(id: string): Promise<Partners | undefined> {
    const partners = this.findOne({
      where: {
        id,
      },
    });
    return partners;
  }

  public async findByEmail(email: string): Promise<Partners | undefined> {
    const partners = this.findOne({
      where: {
        email,
      },
    });
    return partners;
  }
  public async findByPhone(phone: string): Promise<Partners | undefined> {
    const partners = this.findOne({
      where: {
        phone,
      },
    });
    return partners;
  }
}
export default PartnersRepositories;
