import { getCustomRepository } from 'typeorm';
import PartnerInterest from '../typeorm/entities/PartnerInterest';
import PartnerInterestRepository from '../typeorm/repositories/PartnerInterestRepository';

interface IRequest {
  id_partners: string;
  id_interest: string;
}

class CreatePartnerInterestService {
  public async execute({ id_partners, id_interest }: IRequest): Promise<PartnerInterest> {
    const partnerInterestRepository = getCustomRepository(PartnerInterestRepository);
    const partnerInterest = partnerInterestRepository.create({
      id_partners,
      id_interest,
    });
    await partnerInterestRepository.save(partnerInterest);
    return partnerInterest;
  }
}

export default CreatePartnerInterestService;
