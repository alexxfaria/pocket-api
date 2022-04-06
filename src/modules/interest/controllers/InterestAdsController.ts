import { Request, Response } from 'express';
import CreateInterestAdsService from '../services/CreateInterestAdsService';

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
}
export default InterestAdsController;
