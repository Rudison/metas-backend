import { getCustomRepository } from 'typeorm';
import Usuarios from '../../typeorm/entities/Usuarios';
import { UsuariosRepository } from '../../typeorm/repositories/UsuariosRepository';

class ListUsuarioService {
  public async execute(): Promise<Usuarios[]> {
    const usersRepository = getCustomRepository(UsuariosRepository);

    const usuarios = await usersRepository.find();

    return usuarios;
  }
}

export default ListUsuarioService;
