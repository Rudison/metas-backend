import { Router } from 'express';
import { celebrate, Joi, errors, Segments } from 'celebrate';
import GetVendasBlueController from '@modules/blue/controllers/GetVendasBlueController';

const metasBlueRouter = Router();
const metasBlueController = new GetVendasBlueController();

metasBlueRouter.get(
  '/getVendasBlue/:codVendedor/:dataInicial/:dataFinal',
  celebrate({
    [Segments.PARAMS]: {
      codVendedor: Joi.string().required(),
      dataInicial: Joi.string().required(),
      dataFinal: Joi.string().required()
    }
  }),
  metasBlueController.getMetaVendedorBlue
);

export default metasBlueRouter;
