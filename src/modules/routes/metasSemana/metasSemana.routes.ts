import { Router } from 'express';
import { celebrate, Joi, errors, Segments } from 'celebrate';
import MetasSemanaController from '@modules/controllers/metasSemana/MetasSemanaController';

const metasSemanaRouter = Router();
const metasController = new MetasSemanaController();

metasSemanaRouter.get('/', metasController.index);

metasSemanaRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() }
  }),
  metasController.show
);

metasSemanaRouter.get(
  '/porMeta/:metaId',
  celebrate({
    [Segments.PARAMS]: { metaId: Joi.number().required() }
  }),
  metasController.byMetaId
);

metasSemanaRouter.get(
  '/semanasRestantes/:metaId',
  celebrate({
    [Segments.PARAMS]: { metaId: Joi.number().required() }
  }),
  metasController.semanasMetaId
);

metasSemanaRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      metaId: Joi.number().required(),
      semanaId: Joi.number().required(),
      dataInicial: Joi.string().required(),
      dataFinal: Joi.string().required(),
      diasAdicionais: Joi.number(),
      incluirFeriadoDaSemana: Joi.boolean()
    }
  }),
  metasController.create
);

metasSemanaRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() },
    [Segments.BODY]: {
      dataInicial: Joi.date().required(),
      dataFinal: Joi.date().required(),
      diasAdicionais: Joi.number(),
      incluirFeriadoDaSemana: Joi.boolean()
    }
  }),
  metasController.update
);

metasSemanaRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() }
  }),
  metasController.delete
);

export default metasSemanaRouter;
