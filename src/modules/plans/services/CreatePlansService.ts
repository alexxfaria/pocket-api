import { getCustomRepository } from 'typeorm';
import Plans from '../typeorm/entities/Plans';
import PlansRepository from '../typeorm/repositories/PlansRepository';

interface IRequest {
  name: string;
  photos: number;
  price: number;
  time: Date;
}

class CreatePlansService {
  public async execute({ name, photos, price, time }: IRequest): Promise<Plans> {
    const plansRepository = getCustomRepository(PlansRepository);
    const plans = plansRepository.create({
      name,
      photos,
      price,
      time,
    });
    await plansRepository.save(plans);
    return plans;
  }
}

export default CreatePlansService;
