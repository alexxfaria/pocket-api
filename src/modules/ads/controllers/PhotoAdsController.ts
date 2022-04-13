import { Request, Response } from 'express';
import CreatePhotoAdsService from '../services/CreatePhotoAdsService';
import DeletePhotoAdsService from '../services/DeletePhotoAdsService';
import UpdatePhotoAdsService from '../services/UpdatePhotoAdsService';

class PhotoAdsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { photo, id_ads } = req.body;

    const createPhotoAds = new CreatePhotoAdsService();

    const photoAds = await createPhotoAds.execute({
      photo,
      id_ads,
    });
    return res.json(photoAds);
  }
  public async update(req: Request, res: Response): Promise<Response> {
    const { photo, id_ads, active } = req.body;
    const { id } = req.params;

    const updatePhotoAds = new UpdatePhotoAdsService();

    const photoAds = await updatePhotoAds.execute({
      id,
      photo,
      id_ads,
      active,
    });
    return res.json(photoAds);
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deletePhotoAds = new DeletePhotoAdsService();

    await deletePhotoAds.execute({ id });

    return res.json([]);
  }
}
export default PhotoAdsController;
