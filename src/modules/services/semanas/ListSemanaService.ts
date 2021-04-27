import Semanas from '@modules/typeorm/entities/Semanas';
import { SemanasRepository } from '@modules/typeorm/repositories/SemanasRepository';
import { getConnection } from 'typeorm';

class ListSemanaService {
  public async execute(): Promise<Semanas[]> {
    const conn = getConnection('metasConn');
    const semanaRepository = conn.getCustomRepository(SemanasRepository);

    const semana = await semanaRepository.find();

    return semana;
  }

  public async getVendedoresSelect(): Promise<Semanas[] | undefined> {
    const conn = getConnection('metasConn');
    const repository = conn.getCustomRepository(SemanasRepository);

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
