import { Request, Response } from 'express';
import CreateInterestService from '../services/CreateInterestService';
import DeleteInterestService from '../services/DeleteInterestService';

class InterestController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const createInterest = new CreateInterestService();

    const interest = await createInterest.execute({
      name,
    });
    return res.json(interest);
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteInterest = new DeleteInterestService();

    await deleteInterest.execute({ id });

    return res.json([]);
  }
}
export default InterestController;
