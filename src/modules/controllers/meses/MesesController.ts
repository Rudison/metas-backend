import ListMesesService from '@modules/services/meses/ListMesesService';
import { Request, Response } from 'express';

export default class MesesController {
  //
  public async index(request: Request, response: Response): Promise<Response> {
    const listMeses = new ListMesesService();
    const meses = await listMeses.executeAll();

    return response.json(meses);
  }

  public async showById(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;

    const showMes = new ListMesesService();
    const mes = await showMes.execute({ id });

    return response.json(mes);
  }
}
