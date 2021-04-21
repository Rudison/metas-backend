import { hash } from 'bcryptjs';
import { Request, Response } from 'express';
import CreateUsuarioService from '@modules/services/usuarios/CreateUsuarioService';
import DeleteUsuarioService from '@modules/services/usuarios/DeleteUsuarioService';
import ListUsuarioService from '@modules/services/usuarios/ListUsuarioService';
import ShowUsuarioService from '@modules/services/usuarios/ShowUsuarioService';
import UpdateUsuarioService from '@modules/services/usuarios/UpdateUsuarioService';

export default class UsuariosController {
  public async index(request: Request, response: Response): Promise<Response> {
    const usuarioService = new ListUsuarioService();
    const usuarios = await usuarioService.execute();
    return response.json(usuarios);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUsuario = new ShowUsuarioService();

    const usuario = await showUsuario.execute({ id });

    return response.json(usuario);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, email, password, ativo } = request.body;
    const usuarioService = new CreateUsuarioService();
    const usuario = await usuarioService.execute({
      nome,
      email,
      password,
      ativo
    });
    return response.json(usuario);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { nome, email, password, ativo } = request.body;

    const usuarioService = new UpdateUsuarioService();

    const hashPassword = await hash(password, 8);

    const usuario = await usuarioService.execute({
      id,
      nome,
      email,
      password: hashPassword,
      ativo
    });

    return response.json(usuario);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const usuarioService = await new DeleteUsuarioService();
    await usuarioService.execute({ id });

    return response.json([]);
  }
}
