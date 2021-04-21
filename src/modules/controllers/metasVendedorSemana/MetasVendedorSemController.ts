import CreateMetaVendSemService from '@modules/services/metasVendedorSemana/CreateMetaVendSemService';
import DeleteMetaVendSemService from '@modules/services/metasVendedorSemana/DeleteMetaVendSemService';
import ListMetaVendSemService from '@modules/services/metasVendedorSemana/ListMetaVendSemService';
import ShowMetaVendSemService from '@modules/services/metasVendedorSemana/ShowMetaVendSemService';
import UpdateMetaVendSemService from '@modules/services/metasVendedorSemana/UpdateMetaVendSemService';
import UpdatePercentualService from '@modules/services/metasVendedorSemana/UpdatePercentualService';
import { Request, Response } from 'express';

export default class MetasVendedorSemController {
  //
  public async index(request: Request, response: Response): Promise<Response> {
    const listMetas = new ListMetaVendSemService();
    const metas = await listMetas.execute();

    return response.json(metas);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showMeta = new ShowMetaVendSemService();
    const meta = await showMeta.execute({ id });

    return response.json(meta);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      metaSemanaId,
      vendedorId,
      valorRealizado,
      valorPrevisto
    } = request.body;
    const createMeta = new CreateMetaVendSemService();
    const meta = await createMeta.execute({
      metaSemanaId,
      vendedorId,
      valorRealizado,
      valorPrevisto
    });

    return response.json(meta);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { valorPrevisto } = request.body;

    const updateMeta = new UpdateMetaVendSemService();
    const meta = updateMeta.execute({
      id,
      valorPrevisto
    });

    return response.json(meta);
  }

  public async patch(request: Request, response: Response): Promise<Response> {
    const { metaId, metaSemanaId } = request.params;

    const updateMeta = new UpdatePercentualService();
    const meta = updateMeta.execute({
      metaId,
      metaSemanaId
    });

    return response.json(meta);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteMeta = new DeleteMetaVendSemService();
    await deleteMeta.execute({ id });

    return response.json([]);
  }
}