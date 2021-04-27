import Meses from '@modules/typeorm/entities/Meses';
import { MesRepository } from '@modules/typeorm/repositories/MesRepository';
import { getConnection } from 'typeorm';

interface IRequest {
  id: string;
}
class ListMesesService {
  public async execute({ id }: IRequest): Promise<Meses | undefined> {
    const conn = getConnection('metasConn');
    const repository = conn.getCustomRepository(MesRepository);

    const mes = await repository.findById(id);

    return mes;
  }

  public async executeAll(): Promise<Meses[] | undefined> {
    const conn = getConnection('metasConn');
    const repository = conn.getCustomRepository(MesRepository);

    const meses = await repository
      .createQueryBuilder('a')
      .select('a.id as "value"')
      .addSelect('a."descricao" as "text"')
      .getRawMany();

    return meses;
  }
}

export default ListMesesService;
