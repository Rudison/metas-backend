import { Router } from 'express';
import { celebrate, Joi, errors, Segments } from 'celebrate';
import MetasVendedorSemController from '@modules/controllers/metasVendedorSemana/MetasVendedorSemController';
import MetasUpdatePercController from '@modules/controllers/metasVendedorSemana/MetasUpdatePercController';

const metasVendSemRouter = Router();
const metasVendSemController = new MetasVendedorSemController();
const metasUpdatePercController = new MetasUpdatePercController();

metasVendSemRouter.get('/', metasVendSemController.index);

metasVendSemRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() }
  }),
  metasVendSemController.show
);

metasVendSemRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      metaSemanaId: Joi.number().required(),
      vendedorId: Joi.number().required(),
      valorRealizado: Joi.number().required(),
      valorPrevisto: Joi.number().required()
    }
  }),
  metasVendSemController.create
);

metasVendSemRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() },
    [Segments.BODY]: {
      valorMetaMensal: Joi.number().required()
    }
  }),
  metasVendSemController.update
);

metasVendSemRouter.patch(
  '/percentual/',
  celebrate({
    [Segments.BODY]: {
      metaId: Joi.number(),
      metaSemanaId: Joi.number(),
      metaMensal: Joi.boolean()
    }
  }),
  metasUpdatePercController.update
);

metasVendSemRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() }
  }),
  metasVendSemController.delete
);

metasVendSemRouter.delete(
  '/vendedorSemana/:metaId',
  celebrate({
    [Segments.PARAMS]: { metaId: Joi.number().required() }
  }),
  metasVendSemController.deleteAll
);

export default metasVendSemRouter;
