import { Router } from 'express';
import { celebrate, Joi, errors, Segments } from 'celebrate';
import MetasController from '@modules/controllers/metas/MetasController';

const metasRouter = Router();
const metasController = new MetasController();

metasRouter.get('/', metasController.index);

metasRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() }
  }),
  metasController.show
);

// metasRouter.get(
//   '/porAno/:ano',
//   celebrate({
//     [Segments.PARAMS]: { ano: Joi.number().required() }
//   }),
//   metasController.metasPorAno
// );

metasRouter.get(
  '/porAno/:ano',
  celebrate({
    [Segments.PARAMS]: { ano: Joi.number().required() }
  }),
  metasController.metasPorAno
);

metasRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      mesId: Joi.number().required(),
      ano: Joi.number().required(),
      valorMetaMensal: Joi.number().required(),
      semanasNoMes: Joi.number()
    }
  }),
  metasController.create
);

metasRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() }
  }),
  metasController.update
);

metasRouter.patch(
  '/percentual/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() }
  }),
  metasController.updateValorPerc
);

metasRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() }
  }),
  metasController.delete
);

export default metasRouter;
