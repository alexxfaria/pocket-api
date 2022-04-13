import { getCustomRepository } from 'typeorm';
import Partners from '../typeorm/entities/Partners';
import PartnersRepositories from '../typeorm/repositories/PartnersRepositories';

class ListPartnersService {
  public async execute(): Promise<Partners[]> {
    const partnersRepositories = getCustomRepository(PartnersRepositories);
    const partners = await partnersRepositories.find();
    return partners;
  }
}
export default ListPartnersService;
