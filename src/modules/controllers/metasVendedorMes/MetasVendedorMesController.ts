import CreateMetaVendMesService from '@modules/services/metasVendedorMes/CreateMetaVendMesService';
import DeleteMetaVendMesService from '@modules/services/metasVendedorMes/DeleteMetaVendMesService';
import ListMetaVendMesService from '@modules/services/metasVendedorMes/ListMetaVendMesService';
import ShowMetaVendMesService from '@modules/services/metasVendedorMes/ShowMetaVendMesService';
import UpdateMetaVendMesService from '@modules/services/metasVendedorMes/UpdateMetaVendMesService';
import { Request, Response } from 'express';

export default class MetasVendedorMesController {
  //
  public async index(request: Request, response: Response): Promise<Response> {
    const listMetas = new ListMetaVendMesService();
    const metas = await listMetas.execute();

    return response.json(metas);
  }

  public async listByMeta(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { metaId } = request.params;
    const listMetas = new ListMetaVendMesService();
    const metas = await listMetas.executePorMeta({ metaId });

    return response.json(metas);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showMeta = new ShowMetaVendMesService();
    const meta = await showMeta.execute({ id });

    return response.json(meta);
  }

  public async vendedorSelect(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { metaId } = request.params;
    const showMeta = new ListMetaVendMesService();
    const meta = await showMeta.getVendedoresSelect({ metaId });

    return response.json(meta);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { metaId, vendedorId, valorMetaMensal } = request.body;
    const createMeta = new CreateMetaVendMesService();
    const meta = await createMeta.execute({
      metaId,
      vendedorId,
      valorMetaMensal
    });

    return response.json(meta);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { valorMetaMensal } = request.body;

    const updateMeta = new UpdateMetaVendMesService();
    const meta = updateMeta.execute({
      id,
      valorMetaMensal
    });

    return response.json(meta);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id, metaId, vendedorId } = request.params;

    const deleteMeta = new DeleteMetaVendMesService();

    await deleteMeta.execute({ id, metaId, vendedorId });

    return response.json([]);
  }

  public async excluirTodos(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { metaId } = request.params;

    const deleteMeta = new DeleteMetaVendMesService();
    await deleteMeta.excluirTodos({ metaId });

    return response.json([]);
  }
}
