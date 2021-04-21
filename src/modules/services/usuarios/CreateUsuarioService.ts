import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Usuarios from '../../typeorm/entities/Usuarios';
import { UsuariosRepository } from '../../typeorm/repositories/UsuariosRepository';

interface IRequest {
  nome: string;
  email: string;
  password: string;
  ativo: boolean;
}

class CreateUsuarioService {
  public async execute({
    nome,
    email,
    password,
    ativo
  }: IRequest): Promise<Usuarios> {
    const usersRepository = getCustomRepository(UsuariosRepository);
    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) throw new AppError('Email already exists!');

    const hashPassword = await hash(password, 8);

    const user = usersRepository.create({
      nome,
      email,
      password: hashPassword,
      ativo
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUsuarioService;
