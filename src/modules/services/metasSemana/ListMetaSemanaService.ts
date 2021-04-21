import MetasSemana from '@modules/typeorm/entities/MetasSemana';
import { MetasSemanaRepository } from '@modules/typeorm/repositories/MetasSemanaRepository';
import { getCustomRepository } from 'typeorm';

class ListMetaSemanaService {
  public async execute(): Promise<MetasSemana[]> {
    const repository = getCustomRepository(MetasSemanaRepository);

    const meta = await repository.find();

    return meta;
  }
}

export default ListMetaSemanaService;
