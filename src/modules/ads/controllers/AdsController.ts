import { Request, Response } from 'express';
import CreateAdsService from '../services/CreateAdsService';
import DeleteAdsService from '../services/DeleteAdsService';
import UpdateAdsService from '../services/UpdateAdsService';

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
  public async update(req: Request, res: Response): Promise<Response> {
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
      active,
    } = req.body;
    const { id } = req.params;

    const updateAds = new UpdateAdsService();

    const ads = await updateAds.execute({
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
    });
    return res.json(ads);
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteAds = new DeleteAdsService();

    await deleteAds.execute({ id });

    return res.json([]);
  }
}
export default AdsController;
