import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import PlansController from '../controllers/PlansController';

const plansRouter = Router();
const plansController = new PlansController();

plansRouter.use(isAuthenticated);
plansRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      photos: Joi.number(),
      price: Joi.number().precision(2),
      time: Joi.date(),
    },
  }),
  plansController.create,
);
export default plansRouter;
