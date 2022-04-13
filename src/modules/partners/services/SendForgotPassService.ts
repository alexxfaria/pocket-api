import EtherealMail from '@config/mail/EtherealMail';
import AppError from '@shared/errors/AppError';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import PartnersRepositories from '../typeorm/repositories/PartnersRepositories';
import PartnersTokenRepository from '../typeorm/repositories/PartnersTokenRepository';

interface IRequest {
  email: string;
}

class SendForgotPassService {
  public async execute({ email }: IRequest): Promise<void> {
    const partnersRepositories = getCustomRepository(PartnersRepositories);
    const partnersTokenRepository = getCustomRepository(PartnersTokenRepository);

    const emailExists = await partnersRepositories.findByEmail(email);

    if (!emailExists) {
      throw new AppError('Parceiro não encontrado.');
    }

    const { token } = await partnersTokenRepository.generate(emailExists.id);

    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

    await EtherealMail.sendMail({
      to: {
        name: emailExists.name,
        email: emailExists.email,
      },
      subject: 'Recuperação de senhas',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: emailExists.name,
          link: `http://localhost:3333/reset_password?token=${token}`,
        },
      },
    });
  }
}
export default SendForgotPassService;
