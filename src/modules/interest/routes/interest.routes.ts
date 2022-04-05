import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import InterestController from '../controllers/InterestController';

const interestRouter = Router();
const interestController = new InterestController();

interestRouter.use(isAuthenticated);
interestRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
    },
  }),
  interestController.create,
);
export default interestRouter;
