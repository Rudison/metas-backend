import { ViewColumn, ViewEntity } from 'typeorm';
@ViewEntity({
  name: 'GetVendasVendedorMeta(empresaId, CodVendedor, DataInicial, DataFinal)',
  database: 'blueConn'
})
class GetVendasVendedorMeta {
  @ViewColumn({ name: 'CodVend' })
  CodVend: string;

  @ViewColumn({ name: 'ValorTotal' })
  ValorTotal: number;

  @ViewColumn({ name: 'Comissao' })
  Comissao: number;
}

export default GetVendasVendedorMeta;
