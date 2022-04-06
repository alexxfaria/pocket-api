import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import InterestAdsController from '../controllers/InterestAdsController';

const interestAdsRouter = Router();
const interestAdsController = new InterestAdsController();

interestAdsRouter.use(isAuthenticated);
interestAdsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      id_interest: Joi.string(),
      id_ads: Joi.string(),
    },
  }),
  interestAdsController.create,
);
export default interestAdsRouter;
