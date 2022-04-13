import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import Partners from '../typeorm/entities/Partners';
import PartnersRepositories from '../typeorm/repositories/PartnersRepositories';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  partners: Partners;
  token: string;
}
class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const partnersRepository = getCustomRepository(PartnersRepositories);
    const partners = await partnersRepository.findByEmail(email);

    if (!partners) {
      throw new AppError('Email / Senha incorreto', 401);
    }
    const passwordConfirmed = await compare(password, partners.password);

    if (!passwordConfirmed) {
      throw new AppError('Email / Senha incorreto', 401);
    }
    const token = sign({}, authConfig.jwt.secret, {
      subject: partners.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { partners, token };
  }
}
export default CreateSessionService;
