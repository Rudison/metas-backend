import { Request, Response } from 'express';
import CreateFeriadoService from '@modules/services/feriados/CreateFeriadoService';
import ListFeriadoService from '@modules/services/feriados/ListFeriadoService';
import ShowFeriadoService from '@modules/services/feriados/ShowFeriadoService';
import UpdateFeriadoService from '@modules/services/feriados/UpdateFeriadoService';
import DeleteFeriadoService from '@modules/services/feriados/DeleteFeriadoService';

export default class EmpresasController {
  //
  public async index(request: Request, response: Response): Promise<Response> {
    const listFeriados = new ListFeriadoService();
    const feriados = await listFeriados.execute();

    return response.json(feriados);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showFeriado = new ShowFeriadoService();
    const feriado = await showFeriado.execute({ id });

    return response.json(feriado);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { descricao, dia } = request.body;
    const createFeriado = new CreateFeriadoService();
    const feriado = await createFeriado.execute({
      descricao,
      dia
    });

    return response.json(feriado);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { descricao, dia } = request.body;

    const updateFeriado = new UpdateFeriadoService();
    const feriado = await updateFeriado.execute({
      id,
      descricao,
      dia
    });

    return response.json(feriado);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteFeriado = new DeleteFeriadoService();
    await deleteFeriado.execute({ id });

    return response.json([]);
  }
}
