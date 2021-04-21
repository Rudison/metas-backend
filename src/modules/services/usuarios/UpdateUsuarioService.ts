import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Usuarios from '../../typeorm/entities/Usuarios';
import { UsuariosRepository } from '../../typeorm/repositories/UsuariosRepository';

interface IRequest {
  id: string;
  nome: string;
  email: string;
  password: string;
  ativo: boolean;
}

class UpdateUsuarioService {
  public async execute({
    id,
    nome,
    email,
    password,
    ativo
  }: IRequest): Promise<Usuarios> {
    const usuarioRepository = getCustomRepository(UsuariosRepository);

    const usuario = await usuarioRepository.findOne(id);
    if (!usuario) throw new AppError('Usuário Não Encontrado!');

    const hashPassword = await hash(password, 8);

    usuario.nome = nome;
    usuario.email = email;
    usuario.password = hashPassword;
    usuario.ativo = ativo;

    await usuarioRepository.save(usuario);

    return usuario;
  }
}

export default UpdateUsuarioService;
