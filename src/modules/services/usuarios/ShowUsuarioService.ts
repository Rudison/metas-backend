import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Usuarios from '../../typeorm/entities/Usuarios';
import { UsuariosRepository } from '../../typeorm/repositories/UsuariosRepository';

interface IRequest {
  id: string;
}

class ShowUsuarioService {
  public async execute({ id }: IRequest): Promise<Usuarios> {
    const usuarioRepository = getCustomRepository(UsuariosRepository);

    const usuario = await usuarioRepository.findOne(id);

    if (!usuario) throw new AppError('Usuário Não Encontrado!');

    return usuario;
  }
}

export default ShowUsuarioService;
