import { getCustomRepository } from 'typeorm';
import Interest from '../typeorm/entities/Interest';
import InterestRepository from '../typeorm/repositories/InterestRepository';

interface IRequest {
  name: string;
}

class CreateInterestService {
  public async execute({ name }: IRequest): Promise<Interest> {
    const interestRepository = getCustomRepository(InterestRepository);
    const interest = interestRepository.create({
      name,
    });
    await interestRepository.save(interest);
    return interest;
  }
}

export default CreateInterestService;
