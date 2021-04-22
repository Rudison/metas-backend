import Semanas from '@modules/typeorm/entities/Semanas';
import { SemanasRepository } from '@modules/typeorm/repositories/SemanasRepository';
import { getCustomRepository } from 'typeorm';

class ListSemanaService {
  public async execute(): Promise<Semanas[]> {
    const semanaRepository = getCustomRepository(SemanasRepository);

    const semana = await semanaRepository.find();

    return semana;
  }

  public async getVendedoresSelect(): Promise<Semanas[] | undefined> {
    const repository = getCustomRepository(SemanasRepository);

    const semanas = await repository
      .createQueryBuilder('a')
      .select('a.id as "value"')
      .addSelect('a.descricao as "text"')
      .where('a.id <> 6')
      .orderBy('a.id')
      .getRawMany();

    return semanas;
  }
}

export default ListSemanaService;
