import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import Usuarios from '../../typeorm/entities/Usuarios';
import { UsuariosRepository } from '../../typeorm/repositories/UsuariosRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Usuarios;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsuariosRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) throw new AppError('Combinação Incorreta email/senha!', 401);

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed)
      throw new AppError('Combinação Incorreta email/senha!', 401);

    const token = await sign({}, authConfig.jwt.secretKey, {
      subject: user.id.toString(),
      expiresIn: authConfig.jwt.expiresIn
    });

    return {
      user,
      token
    };
  }
}

export default CreateSessionsService;
