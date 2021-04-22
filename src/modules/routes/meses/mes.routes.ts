import { Router } from 'express';
import { celebrate, Joi, errors, Segments } from 'celebrate';
import MesesController from '@modules/controllers/meses/MesesController';

const mesesRouter = Router();
const mesesController = new MesesController();

mesesRouter.get('/', mesesController.index);

mesesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() }
  }),
  mesesController.showById
);

export default mesesRouter;
