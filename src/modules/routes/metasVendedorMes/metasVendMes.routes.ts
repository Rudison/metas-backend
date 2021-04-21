import { Router } from 'express';
import { celebrate, Joi, errors, Segments } from 'celebrate';
import MetasVendedorMesController from '@modules/controllers/metasVendedorMes/MetasVendedorMesController';

const metasVendMesRouter = Router();
const metasVendMesController = new MetasVendedorMesController();

metasVendMesRouter.get('/', metasVendMesController.index);

metasVendMesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() }
  }),
  metasVendMesController.show
);

metasVendMesRouter.get(
  '/porMeta/:metaId',
  celebrate({
    [Segments.PARAMS]: { metaId: Joi.number().required() }
  }),
  metasVendMesController.listByMeta
);

metasVendMesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      metaId: Joi.number().required(),
      vendedorId: Joi.number().required(),
      valorMetaMensal: Joi.number().required()
    }
  }),
  metasVendMesController.create
);

metasVendMesRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() },
    [Segments.BODY]: {
      valorMetaMensal: Joi.number().required()
    }
  }),
  metasVendMesController.update
);

metasVendMesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() }
  }),
  metasVendMesController.delete
);

export default metasVendMesRouter;
