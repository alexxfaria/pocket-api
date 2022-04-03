import { Request, Response } from 'express';
import CreateAdsService from '../services/CreateAdsService';

class AdsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
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
    } = req.body;

    const createAds = new CreateAdsService();

    const ads = await createAds.execute({
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
    return res.json(ads);
  }
}
export default AdsController;
