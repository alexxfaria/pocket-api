import { EntityRepository, Repository } from 'typeorm';
import PartnersToken from '../entities/PartnersToken';

@EntityRepository(PartnersToken)
class PartnersTokenRepository extends Repository<PartnersToken> {
  public async findByToken(token: string): Promise<PartnersToken | undefined> {
    const partnersToken = this.findOne({
      where: {
        token,
      },
    });
    return partnersToken;
  }

  public async generate(user_id: string): Promise<PartnersToken> {
    const partnersToken = this.create({
      user_id,
    });
    await this.save(partnersToken);
    return partnersToken;
  }
}
export default PartnersTokenRepository;
