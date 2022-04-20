import PartnersRepositories from '@modules/partners/typeorm/repositories/PartnersRepositories';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Ads from '../typeorm/entities/Ads';
import AdsRepository from '../typeorm/repositories/AdsRepository';

interface IRequest {
  description: string;
  color: string;
  measure: string;
  max_price: number;
  ideal_amount: number;
  min_amount: number;
  max_amount: number;
  limit_date: Date;
  validity_check: Date;
  id_partner: string;
}

class CreateAdsService {
  public async execute({
    description,
    color,
    measure,
    max_price,
    ideal_amount,
    min_amount,
    max_amount,
    limit_date,
    validity_check,
    id_partner,
  }: IRequest): Promise<Ads> {
    const adsRepository = getCustomRepository(AdsRepository);
    const partnersRepository = getCustomRepository(PartnersRepositories);
    const ads = adsRepository.create({
      description,
      color,
      measure,
      max_price,
      ideal_amount,
      min_amount,
      max_amount,
      limit_date,
      validity_check,
      id_partner,
    });
    const partners = await partnersRepository.findById(id_partner);
    if (!partners?.id) {
      throw new AppError('Parceiro não encontrado.');
    }

    await adsRepository.save(ads);
    return ads;
  }
}
export default CreateAdsService;
