import { Request, Response } from 'express';
import GetVendasBlueService from '../services/GetVendasBlueService';

export default class GetVendasBlueController {
  public async getMetaVendedorBlue(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { codVendedor, dataInicial, dataFinal } = request.params;

    const metaVendedor = new GetVendasBlueService();

    const valores = await metaVendedor.getVendasBlue({
      codVendedor,
      dataInicial,
      dataFinal
    });

    return response.json(valores);
  }
}
