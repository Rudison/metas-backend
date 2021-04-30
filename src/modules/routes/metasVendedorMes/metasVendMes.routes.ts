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

metasVendMesRouter.get(
  '/vendedorMetaSelect/:metaId',
  celebrate({
    [Segments.PARAMS]: { metaId: Joi.number().required() }
  }),
  metasVendMesController.vendedorSelect
);

metasVendMesRouter.get(
  '/vendedoresSemana/:metaId',
  celebrate({
    [Segments.PARAMS]: { metaId: Joi.number().required() }
  }),
  metasVendMesController.vendedoreSemana
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
  '/:id/:metaId/:vendedorId',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
      metaId: Joi.number().required(),
      vendedorId: Joi.number().required()
    }
  }),
  metasVendMesController.delete
);

metasVendMesRouter.delete(
  '/metasMes/:metaId',
  celebrate({
    [Segments.PARAMS]: { metaId: Joi.number().required() }
  }),
  metasVendMesController.excluirTodos
);

export default metasVendMesRouter;
