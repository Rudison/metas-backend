import CreateSessionsService from '@modules/services/usuarios/CreateSessionsService';
import { Request, Response } from 'express';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessionsService = new CreateSessionsService();
    const user = await createSessionsService.execute({ email, password });

    return response.json(user);
  }
}
