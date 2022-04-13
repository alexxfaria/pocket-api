import { Router } from 'express';
import PartnersController from '../controllers/PartnersController';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import PartnersAvatarController from '../controllers/PartnersAvatarController';
import { ensureAdmin } from '../../../shared/http/middlewares/ensureAdmin';

const partnersRouter = Router();
const partnersController = new PartnersController();
const partnersAvatarController = new PartnersAvatarController();
const upload = multer(uploadConfig);

partnersRouter.get('/', isAuthenticated, ensureAdmin, partnersController.index);

partnersRouter.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  partnersController.show,
);
partnersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().required(),
      phone: Joi.string(),
      admin: Joi.boolean(),
      cnpj_cpf: Joi.string(),
      address: Joi.string(),
      number: Joi.string(),
      complements: Joi.string(),
      district: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      country: Joi.string(),
      zip: Joi.string(),
      contact: Joi.string(),
      landline: Joi.string(),
      stop_ads: Joi.boolean(),
      all_ads: Joi.boolean(),
      active: Joi.boolean(),
    },
  }),
  partnersController.create,
);
partnersRouter.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string(),
      admin: Joi.boolean(),
      cnpj: Joi.string(),
      cpf: Joi.string(),
      address: Joi.string(),
      number: Joi.string(),
      complements: Joi.string(),
      district: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      country: Joi.string(),
      zip: Joi.string(),
      contact: Joi.string(),
      landline: Joi.string(),
      stop_ads: Joi.boolean(),
      all_ads: Joi.boolean(),
      active: Joi.boolean(),
    },
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  partnersController.update,
);
partnersRouter.delete(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  partnersController.delete,
);
partnersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  partnersAvatarController.update,
);

export default partnersRouter;
