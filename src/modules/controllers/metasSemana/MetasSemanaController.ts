import { Request, Response } from 'express';
import CreateMetaSemanaService from '@modules/services/metasSemana/CreateMetaSemanaService';
import DeleteMetaSemanaService from '@modules/services/metasSemana/DeleteMetaSemanaService';
import ListMetaSemanaService from '@modules/services/metasSemana/ListMetaSemanaService';
import ShowMetaSemanaService from '@modules/services/metasSemana/ShowMetaSemanaService';
import UpdateMetaSemanaService from '@modules/services/metasSemana/UpdateMetaSemanaService';

export default class MetasSemanaController {
  //
  public async index(request: Request, response: Response): Promise<Response> {
    const listMetas = new ListMetaSemanaService();
    const metas = await listMetas.execute();

    return response.json(metas);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showMeta = new ShowMetaSemanaService();
    const meta = await showMeta.execute({ id });

    return response.json(meta);
  }

  public async byMetaId(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { metaId } = request.params;

    const listMeta = new ListMetaSemanaService();
    const meta = await listMeta.getSemanasMes({ metaId });

    return response.json(meta);
  }

  public async semanasMetaId(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { metaId } = request.params;

    const listMeta = new ListMetaSemanaService();
    const meta = await listMeta.getSemanasRestantes({ metaId });

    return response.json(meta);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      metaId,
      semanaId,
      dataInicial,
      dataFinal,
      diasUteisSemana,
      diasAdicionais,
      incluirFeriadoDaSemana
    } = request.body;
    const createMeta = new CreateMetaSemanaService();
    const meta = await createMeta.execute({
      metaId,
      semanaId,
      dataInicial,
      dataFinal,
      diasUteisSemana,
      diasAdicionais,
      incluirFeriadoDaSemana
    });

    return response.json(meta);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { dataInicial, dataFinal, diasAdicionais } = request.body;

    const updateMeta = new UpdateMetaSemanaService();
    const meta = updateMeta.execute({
      id,
      dataInicial,
      dataFinal,
      diasAdicionais
    });

    return response.json(meta);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteMeta = new DeleteMetaSemanaService();
    await deleteMeta.execute({ id });

    return response.json([]);
  }
}
