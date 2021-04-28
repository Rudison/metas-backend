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

metasVendSemRouter.get(
  '/vendedoresSemana/:metaId/:semanaId',
  celebrate({
    [Segments.PARAMS]: {
      metaId: Joi.number().required(),
      semanaId: Joi.number().required()
    }
  }),
  metasVendSemController.getVendedoreSemana
);

metasVendSemRouter.get(
  '/existeMetaSemana/:metaId/:vendedorId',
  celebrate({
    [Segments.PARAMS]: {
      metaId: Joi.number().required(),
      vendedorId: Joi.number().required()
    }
  }),
  metasVendSemController.getSemanaExistente
);

metasVendSemRouter.get(
  '/relatorio/:metaId/:semanaId',
  celebrate({
    [Segments.PARAMS]: {
      metaId: Joi.number().required(),
      semanaId: Joi.number().required()
    }
  }),
  metasVendSemController.getRelatorio
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
      valorPrevisto: Joi.number().required()
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

metasVendSemRouter.patch(
  '/metaMesVendedor/:metaId/:vendedorId',
  celebrate({
    [Segments.PARAMS]: { metaId: Joi.number(), vendedorId: Joi.number() },
    [Segments.BODY]: {
      valorPrevisto: Joi.number()
    }
  }),
  metasVendSemController.updateMetaMesVendedor
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

metasVendSemRouter.delete(
  '/porSemana/:metaId/:vendedorId',
  celebrate({
    [Segments.PARAMS]: {
      metaId: Joi.number().required(),
      vendedorId: Joi.number().required()
    }
  }),
  metasVendSemController.deletePorSemana
);

export default metasVendSemRouter;
