import { Request, Response } from 'express';
import CreatePartnerInterestService from '../services/CreatePartnerInterestService';

class PartnerInterestController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id_partners, id_interest } = req.body;

    const createPartnersInterest = new CreatePartnerInterestService();

    const createPartners = await createPartnersInterest.execute({
      id_partners,
      id_interest,
    });
    return res.json(createPartners);
  }
}
export default PartnerInterestController;
