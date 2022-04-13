import { Request, Response } from 'express';
import UpdatePartnersAvatarService from '../services/UpdatePartnersAvatarService';

class PartnersAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatar = new UpdatePartnersAvatarService();

    const partners = await updateAvatar.execute({
      user_id: req.partners.id,
      avatarFilename: req.file?.filename as string,
    });

    return res.json(partners);
  }
}
export default PartnersAvatarController;
