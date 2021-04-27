import { getConnection } from 'typeorm';
import Vendedor from '../../typeorm/entities/Vendedor';
import { VendedorRepository } from '../../typeorm/repositories/VendedorRepository';
class ListVendedorService {
  public async execute(): Promise<Vendedor[]> {
    const conn = getConnection('metasConn');
    const vendedorRepository = conn.getCustomRepository(VendedorRepository);

    const vendedor = await vendedorRepository.find();

    return vendedor;
  }

  public async getVendedoresSelect(): Promise<Vendedor[] | undefined> {
    const conn = await getConnection('metasConn');
    const repository = conn.getCustomRepository(VendedorRepository);

    const vendedoresMeta = await repository
      .createQueryBuilder('a')
      .select('a.id as "value"')
      .addSelect('a.nome as "text"')
      .where('a.ativo = true')
      .orderBy('a.nome')
      .getRawMany();

    return vendedoresMeta;
  }
}

export default ListVendedorService;
