import { MetasRepository } from '@modules/typeorm/repositories/MetasRepository';
import { getConnection } from 'typeorm';
import GetVendasVendedorMeta from '../typeorm/entities/GetVendasVendedorMeta';

interface IRequest {
  codVendedor: string;
  dataInicial: string;
  dataFinal: string;
}

class GetVendasBlueService {
  public async getVendasBlue({
    codVendedor,
    dataInicial,
    dataFinal
  }: IRequest): Promise<GetVendasVendedorMeta | undefined> {
    const conn = getConnection('blueConn');

    const valorVendedor = await conn.query(
      `select * from GetVendasVendedorMeta(1, '${codVendedor}', ${dataInicial}, ${dataFinal} )`
    );

    // .then(res => {
    //   const ValorTotal = res[0].ValorTotal;
    //   const Comissao = res[0].Comissao;

    //   valorVendedor = {
    //     ValorTotal,
    //     Comissao
    //   };

    //   return valorVendedor;
    // });

    return valorVendedor;
  }
}

export default GetVendasBlueService;
