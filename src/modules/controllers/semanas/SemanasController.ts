import ListSemanaService from '@modules/services/semanas/ListSemanaService';
import { Request, Response } from 'express';

export default class SemanasController {
  //
  public async index(request: Request, response: Response): Promise<Response> {
    const listSemanas = new ListSemanaService();
    const semanas = await listSemanas.getVendedoresSelect();

    return response.json(semanas);
  }
}
