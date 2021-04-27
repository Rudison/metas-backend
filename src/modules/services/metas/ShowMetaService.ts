import Metas from '@modules/typeorm/entities/Metas';
import { MetasRepository } from '@modules/typeorm/repositories/MetasRepository';
import AppError from '@shared/errors/AppError';
import { getConnection } from 'typeorm';

interface IRequest {
  id: string;
}

class ShowMetaService {
  public async execute({ id }: IRequest): Promise<Metas> {
    const conn = getConnection('metasConn');
    const repository = conn.getCustomRepository(MetasRepository);

    const meta = await repository.findById(id);

    if (!meta) throw new AppError('Meta Não Encontrada!');

    return meta;
  }
}

export default ShowMetaService;
