import { Router } from 'express';
import { celebrate, Joi, errors, Segments } from 'celebrate';
import SemanasController from '@modules/controllers/semanas/SemanasController';

const semanasRouter = Router();
const semanasController = new SemanasController();

semanasRouter.get('/', semanasController.index);

export default semanasRouter;
