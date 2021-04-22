import { getCustomRepository } from 'typeorm';
import Vendedor from '../../typeorm/entities/Vendedor';
import { VendedorRepository } from '../../typeorm/repositories/VendedorRepository';
class ListVendedorService {
  public async execute(): Promise<Vendedor[]> {
    const vendedorRepository = getCustomRepository(VendedorRepository);

    const vendedor = await vendedorRepository.find();

    return vendedor;
  }

  public async getVendedoresSelect(): Promise<Vendedor[] | undefined> {
    const repository = getCustomRepository(VendedorRepository);

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
