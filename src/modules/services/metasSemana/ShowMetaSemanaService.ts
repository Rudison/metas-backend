import MetasSemana from '@modules/typeorm/entities/MetasSemana';
import { MetasSemanaRepository } from '@modules/typeorm/repositories/MetasSemanaRepository';
import AppError from '@shared/errors/AppError';
import { getConnection } from 'typeorm';

interface IRequest {
  id: string;
}

class ShowMetaSemanaService {
  public async execute({ id }: IRequest): Promise<MetasSemana> {
    const conn = getConnection('metasConn');
    const repository = conn.getCustomRepository(MetasSemanaRepository);

    const meta = await repository.findById(id);

    if (!meta) throw new AppError('Meta Semana Não Encontrada!');

    return meta;
  }
}

export default ShowMetaSemanaService;
