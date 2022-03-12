import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import CustomersController from '../controllers/CustomersController';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.use(isAuthenticated);
customersRouter.get('/', customersController.index);

customersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      cnpj: Joi.string(),
      cpf: Joi.string(),
      logradouro: Joi.string(),
      numero: Joi.string(),
      complemento: Joi.string(),
      bairro: Joi.string(),
      cidade: Joi.string(),
      estado: Joi.string(),
      pais: Joi.string(),
      cep: Joi.string(),
    },
  }),
  customersController.create,
);
customersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customersController.show,
);
customersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      cnpj: Joi.string(),
      cpf: Joi.string(),
      logradouro: Joi.string(),
      numero: Joi.string(),
      complemento: Joi.string(),
      bairro: Joi.string(),
      cidade: Joi.string(),
      estado: Joi.string(),
      pais: Joi.string(),
      cep: Joi.string(),
    },
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  customersController.update,
);
customersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  customersController.delete,
);

export default customersRouter;
