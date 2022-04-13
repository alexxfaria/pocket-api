import AppError from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import Partners from '../typeorm/entities/Partners';
import PartnersRepositories from '../typeorm/repositories/PartnersRepositories';
import uploadConfig from '@config/upload';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdatePartnersAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<Partners> {
    const partnersRepository = getCustomRepository(PartnersRepositories);

    const partners = await partnersRepository.findById(user_id);

    if (!partners) {
      throw new AppError('Parceiro não encontrado.');
    }
    if (partners.avatar) {
      const partnersAvatarFilePath = path.join(uploadConfig.directory, partners.avatar);

      const partnersAvatarFileExists = await fs.promises.stat(partnersAvatarFilePath);

      if (partnersAvatarFileExists) {
        await fs.promises.unlink(partnersAvatarFilePath); //Deleta o avatar
      }
    }
    partners.avatar = avatarFilename;

    await partnersRepository.save(partners);

    return partners;
  }
}
export default UpdatePartnersAvatarService;
