import { Request, Response } from 'express';
import CreateInterestService from '../services/CreateInterestService';

class InterestController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const createInterest = new CreateInterestService();

    const interest = await createInterest.execute({
      name,
    });
    return res.json(interest);
  }
}
export default InterestController;
