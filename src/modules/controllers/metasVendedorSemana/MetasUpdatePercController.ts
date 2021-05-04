import UpdatePercentualService from '@modules/services/metasVendedorSemana/UpdatePercentualService';
import { Request, Response } from 'express';

export default class MetasUpdatePercController {
  //
  public async update(request: Request, response: Response): Promise<Response> {
    const { metaId, semanaId, metaMensal } = request.body;

    const updateMeta = new UpdatePercentualService();
    const meta = updateMeta.execute({
      metaId,
      semanaId,
      metaMensal
    });

    return response.json(meta);
  }
}
