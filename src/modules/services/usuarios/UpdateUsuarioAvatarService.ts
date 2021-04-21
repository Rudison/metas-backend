import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Usuarios from '../../typeorm/entities/Usuarios';
import { UsuariosRepository } from '../../typeorm/repositories/UsuariosRepository';
import path from 'path';
import fs from 'fs';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

export default class UpdateUsuarioAvatarService {
  public async execute({
    user_id,
    avatarFileName
  }: IRequest): Promise<Usuarios> {
    const usuarioRepositorio = getCustomRepository(UsuariosRepository);

    const usuario = await usuarioRepositorio.findById(user_id);

    if (!usuario) throw new AppError('Usuário Não Encontrado!');

    if (usuario.avatar) {
      const usuarioAvatarFilePath = path.join(
        uploadConfig.directory,
        usuario.avatar
      );
      const usuarioAvatarFileExists = await fs.promises.stat(
        usuarioAvatarFilePath
      );

      if (usuarioAvatarFileExists)
        await fs.promises.unlink(usuarioAvatarFilePath);
    }
    usuario.avatar = avatarFileName;

    await usuarioRepositorio.save(usuario);

    return usuario;
  }
}
