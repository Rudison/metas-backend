import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsuariosController from '@modules/controllers/usuarios/UsuariosController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import UsuarioAvatarController from '@modules/controllers/usuarios/UsuarioAvatarController';
import multer from 'multer';
import uploadConfig from '@config/upload';

const usuariosRouter = Router();
const usuariosController = new UsuariosController();
const usuarioAvatarController = new UsuarioAvatarController();
const upload = multer(uploadConfig);

usuariosRouter.get('/', isAuthenticated, usuariosController.index);

usuariosRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      ativo: Joi.boolean()
    }
  }),
  usuariosController.create
);

usuariosRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      ativo: Joi.boolean()
    },
    [Segments.PARAMS]: {
      id: Joi.number().required()
    }
  }),
  usuariosController.update
);

usuariosRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  usuarioAvatarController.update
);

usuariosRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() }
  }),
  usuariosController.delete
);

export default usuariosRouter;
