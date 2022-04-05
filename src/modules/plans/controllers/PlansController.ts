import { Request, Response } from 'express';
import CreatePlansService from '../services/CreatePlansService';

class PlansController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, photos, price, time } = req.body;

    const createPlans = new CreatePlansService();

    const plans = await createPlans.execute({
      name,
      photos,
      price,
      time,
    });
    return res.json(plans);
  }
}
export default PlansController;
