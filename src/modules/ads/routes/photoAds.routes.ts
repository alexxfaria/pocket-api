import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import PhotoAdsController from '../controllers/PhotoAdsController';

const photoAdsRouter = Router();
const photoAdsController = new PhotoAdsController();

photoAdsRouter.use(isAuthenticated);
photoAdsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      photo: Joi.string(),
      id_ads: Joi.string(),
    },
  }),
  photoAdsController.create,
);
photoAdsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      photo: Joi.string(),
      id_ads: Joi.string(),
      active: Joi.boolean(),
    },
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  photoAdsController.update,
);
photoAdsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  photoAdsController.delete,
);
export default photoAdsRouter;
