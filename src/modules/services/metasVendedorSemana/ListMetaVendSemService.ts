import MetasVendedorSemana from '@modules/typeorm/entities/MetasVendedorSemana';
import { MetasVendSemRepository } from '@modules/typeorm/repositories/MetasVendSemRepository';
import { getCustomRepository } from 'typeorm';

class ListMetaVendSemService {
  public async execute(): Promise<MetasVendedorSemana[]> {
    const repository = getCustomRepository(MetasVendSemRepository);

    const meta = await repository.find();

    return meta;
  }
}

export default ListMetaVendSemService;
