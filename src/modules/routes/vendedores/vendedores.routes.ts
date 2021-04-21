import { Router } from 'express';
import VendedoresController from '@modules/controllers/vendedores/VendedoresController';
import { celebrate, Joi, Segments } from 'celebrate';

const vendedorRouter = Router();
const vendedoresController = new VendedoresController();

vendedorRouter.get('/', vendedoresController.index);

vendedorRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() }
  }),
  vendedoresController.show
);

vendedorRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      codVendBlue: Joi.string().min(5).max(5).required(),
      nome: Joi.string().required(),
      ativo: Joi.boolean().default(true),
      outros: Joi.boolean().default(false)
    }
  }),
  vendedoresController.create
);

vendedorRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() },
    [Segments.BODY]: {
      codVendBlue: Joi.string().min(5).max(5),
      nome: Joi.string(),
      ativo: Joi.boolean(),
      outros: Joi.boolean()
    }
  }),
  vendedoresController.update
);

vendedorRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() }
  }),
  vendedoresController.delete
);

export default vendedorRouter;
