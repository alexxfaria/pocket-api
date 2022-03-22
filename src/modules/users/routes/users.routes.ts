import { Router } from 'express';
import UserController from '../controllers/UsersController';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import UserAvatarController from '../controllers/UsersAvatarController';
import { ensureAdmin } from '../../../shared/http/middlewares/ensureAdmin';

const usersRouter = Router();
const usersController = new UserController();
const usersAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

usersRouter.get('/', isAuthenticated, ensureAdmin, usersController.index);

usersRouter.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  usersController.show,
);
usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      phone: Joi.string().required(),
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
      active: Joi.boolean(),
    },
  }),
  usersController.create,
);
usersRouter.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
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
      active: Joi.boolean(),
    },
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  usersController.update,
);
usersRouter.delete(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  usersController.delete,
);
usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
