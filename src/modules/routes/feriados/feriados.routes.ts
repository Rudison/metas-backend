import { Router } from 'express';
import FeriadosController from '@modules/controllers/feriados/FeriadosController';
import { celebrate, Joi, errors, Segments } from 'celebrate';

const feriadosRouter = Router();
const feriadosController = new FeriadosController();

feriadosRouter.get('/', feriadosController.index);

feriadosRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() }
  }),
  feriadosController.show
);

feriadosRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      descricao: Joi.string().required(),
      dia: Joi.date()
    }
  }),
  feriadosController.create
);

feriadosRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() },
    [Segments.BODY]: {
      descricao: Joi.string().required(),
      dia: Joi.date()
    }
  }),
  feriadosController.update
);

feriadosRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() }
  }),
  feriadosController.delete
);

export default feriadosRouter;
