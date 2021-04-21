import { Request, Response } from 'express';
import ListMetaService from '@modules/services/metas/ListMetaService';
import ShowMetaService from '@modules/services/metas/ShowMetaService';
import CreateMetaService from '@modules/services/metas/CreateMetaService';
import UpdateMetaService from '@modules/services/metas/UpdateMetaService';
import DeleteMetaService from '@modules/services/metas/DeleteMetaService';

export default class MetasController {
  //
  public async index(request: Request, response: Response): Promise<Response> {
    const listMetas = new ListMetaService();
    const metas = await listMetas.execute();

    return response.json(metas);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showMeta = new ShowMetaService();
    const meta = await showMeta.execute({ id });

    return response.json(meta);
  }

  public async metasPorAno(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { ano } = request.params;

    const showMeta = new ListMetaService();
    const meta = await showMeta.getByCards({ ano });

    return response.json(meta);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { mesId, ano, valorMetaMensal, semanasNoMes } = request.body;
    const createMeta = new CreateMetaService();
    const meta = await createMeta.execute({
      mesId,
      ano,
      valorMetaMensal,
      semanasNoMes
    });

    return response.json(meta);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { valorMetaMensal, semanasNoMes } = request.body;

    const updateMeta = new UpdateMetaService();
    const meta = updateMeta.execute({
      id,
      valorMetaMensal,
      semanasNoMes
    });

    return response.json(meta);
  }

  public async updateValorPerc(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;

    const updateMeta = new UpdateMetaService();
    const meta = updateMeta.updateValorPercentual({
      id
    });

    return response.json(meta);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteMeta = new DeleteMetaService();
    await deleteMeta.execute({ id });

    return response.json([]);
  }
}
