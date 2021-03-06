import PartnersRepositories from '@modules/partners/typeorm/repositories/PartnersRepositories';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Ads from '../typeorm/entities/Ads';
import AdsRepository from '../typeorm/repositories/AdsRepository';

interface IRequest {
  id: string;
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
  active: boolean;
}
class UpdateAdsService {
  public async execute({
    id,
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
    active,
  }: IRequest): Promise<Ads> {
    const adsRepository = getCustomRepository(AdsRepository);
    const partnersRepository = getCustomRepository(PartnersRepositories);
    const ads = await adsRepository.findById(id);
    if (!ads) {
      throw new AppError('Anuncio não existe');
    }

    const partners = await partnersRepository.findById(id_partner);
    if (!partners?.id) {
      throw new AppError('Parceiro não encontrado.');
    }
    if (!partners?.active) {
      throw new AppError('Parceiro esta inativo.');
    }

    ads.description = description;
    ads.color = color;
    ads.measure = measure;
    ads.max_price = max_price;
    ads.ideal_amount = ideal_amount;
    ads.min_amount = min_amount;
    ads.max_amount = max_amount;
    ads.limit_date = limit_date;
    ads.validity_check = validity_check;
    ads.id_partner = id_partner;
    ads.active = active;

    await adsRepository.save(ads);
    return ads;
  }
}
export default UpdateAdsService;
