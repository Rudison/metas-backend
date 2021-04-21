import UpdateUsuarioAvatarService from '@modules/services/usuarios/UpdateUsuarioAvatarService';
import { Request, Response } from 'express';

export default class UsuarioAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUsuarioAvatarService();

    const usuario = await updateAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename
    });

    return response.json(usuario);
  }
}
