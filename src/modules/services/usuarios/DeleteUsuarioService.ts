import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UsuariosRepository } from '../../typeorm/repositories/UsuariosRepository';

interface IRequest {
  id: string;
}

class DeleteUsuarioService {
  public async execute({ id }: IRequest): Promise<void> {
    const usuarioRepository = getCustomRepository(UsuariosRepository);
    const usuario = await usuarioRepository.findOne(id);

    if (!usuario) throw new AppError('Usuário Não Encontrado!');

    await usuarioRepository.remove(usuario);
  }
}
export default DeleteUsuarioService;
