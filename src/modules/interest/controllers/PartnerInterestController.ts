import { Request, Response } from 'express';
import CreatePartnerInterestService from '../services/CreatePartnerInterestService';
import DeletePartnerInterestService from '../services/DeletePartnerInterestService';

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
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deletePartnerInterest = new DeletePartnerInterestService();

    await deletePartnerInterest.execute({ id });

    return res.json([]);
  }
}
export default PartnerInterestController;
