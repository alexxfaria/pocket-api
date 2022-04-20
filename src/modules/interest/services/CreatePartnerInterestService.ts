import PartnersRepositories from '@modules/partners/typeorm/repositories/PartnersRepositories';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import PartnerInterest from '../typeorm/entities/PartnerInterest';
import InterestRepository from '../typeorm/repositories/InterestRepository';
import PartnerInterestRepository from '../typeorm/repositories/PartnerInterestRepository';

interface IRequest {
  id_partners: string;
  id_interest: string;
}

class CreatePartnerInterestService {
  public async execute({ id_partners, id_interest }: IRequest): Promise<PartnerInterest> {
    const partnerInterestRepository = getCustomRepository(PartnerInterestRepository);
    const partnersRepository = getCustomRepository(PartnersRepositories);
    const interestRepository = getCustomRepository(InterestRepository);
    const partnerInterest = partnerInterestRepository.create({
      id_partners,
      id_interest,
    });
    const interest = await interestRepository.findById(id_interest);
    if (!interest?.id) {
      throw new AppError('Interesse não encontrado.');
    }
    const partner = await partnersRepository.findById(id_partners);
    if (!partner?.id) {
      throw new AppError('Parceiro não encontrado.');
    }
    await partnerInterestRepository.save(partnerInterest);
    return partnerInterest;
  }
}

export default CreatePartnerInterestService;
