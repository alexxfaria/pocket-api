import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import PartnerInterestController from '../controllers/PartnerInterestController';

const partnerInterestRouter = Router();
const partnerInterestController = new PartnerInterestController();

partnerInterestRouter.use(isAuthenticated);
partnerInterestRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      id_partners: Joi.string(),
      id_interest: Joi.string(),
    },
  }),
  partnerInterestController.create,
);
partnerInterestRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  partnerInterestController.delete,
);
export default partnerInterestRouter;
