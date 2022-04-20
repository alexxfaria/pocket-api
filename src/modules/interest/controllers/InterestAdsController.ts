import { Request, Response } from 'express';
import CreateInterestAdsService from '../services/CreateInterestAdsService';
import DeleteInterestAdsService from '../services/DeleteInterestAdsService';

class InterestAdsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id_interest, id_ads } = req.body;

    const createInterestAds = new CreateInterestAdsService();

    const interestAds = await createInterestAds.execute({
      id_interest,
      id_ads,
    });
    return res.json(interestAds);
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteInterestAds = new DeleteInterestAdsService();

    await deleteInterestAds.execute({ id });

    return res.json([]);
  }
}
export default InterestAdsController;
