import MetasVendedorSemana from '@modules/typeorm/entities/MetasVendedorSemana';
import { MetasVendSemRepository } from '@modules/typeorm/repositories/MetasVendSemRepository';
import AppError from '@shared/errors/AppError';
import { getConnection } from 'typeorm';

interface IRequest {
  id: string;
}

class ShowMetaVendSemService {
  public async execute({ id }: IRequest): Promise<MetasVendedorSemana> {
    const conn = getConnection('metasConn');
    const repository = conn.getCustomRepository(MetasVendSemRepository);

    const meta = await repository.findById(id);

    if (!meta) throw new AppError('Meta Semana Não Encontrada!');

    return meta;
  }
}

export default ShowMetaVendSemService;
