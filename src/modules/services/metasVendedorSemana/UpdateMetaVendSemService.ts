import MetasVendedorSemana from '@modules/typeorm/entities/MetasVendedorSemana';
import { MetasVendSemRepository } from '@modules/typeorm/repositories/MetasVendSemRepository';
import AppError from '@shared/errors/AppError';
import { getConnection } from 'typeorm';

interface IRequest {
  id: string;
  valorPrevisto: number;
}

class UpdateMetaVendSemService {
  public async execute({
    id,
    valorPrevisto
  }: IRequest): Promise<MetasVendedorSemana> {
    const conn = getConnection('metasConn');
    const repository = conn.getCustomRepository(MetasVendSemRepository);

    const meta = await repository.findById(id);

    if (!meta) throw new AppError('Meta Semana Não Encontrada!');

    meta.valorPrevisto = valorPrevisto;

    await repository.save(meta);

    return meta;
  }
}

export default UpdateMetaVendSemService;
