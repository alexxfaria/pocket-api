import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import AdsController from '../controllers/AdsController';

const adsRouter = Router();
const adsController = new AdsController();

adsRouter.use(isAuthenticated);
adsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string(),
      color: Joi.string(),
      measure: Joi.string(),
      max_price: Joi.number().precision(2),
      ideal_amount: Joi.number(),
      min_amount: Joi.number(),
      max_amount: Joi.number(),
      limit_date: Joi.date(),
      validity_check: Joi.date(),
      id_partner: Joi.string(),
    },
  }),
  adsController.create,
);
adsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string(),
      color: Joi.string(),
      measure: Joi.string(),
      max_price: Joi.number().precision(2),
      ideal_amount: Joi.number(),
      min_amount: Joi.number(),
      max_amount: Joi.number(),
      limit_date: Joi.date(),
      validity_check: Joi.date(),
      id_partner: Joi.string(),
      active: Joi.boolean(),
    },
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  adsController.update,
);
export default adsRouter;
