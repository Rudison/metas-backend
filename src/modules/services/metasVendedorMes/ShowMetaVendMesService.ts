import MetasVendedorMes from '@modules/typeorm/entities/MetasVendedorMes';
import { MetasVendMesRepository } from '@modules/typeorm/repositories/MetasVendMesRepository';
import AppError from '@shared/errors/AppError';
import { getConnection } from 'typeorm';

interface IRequest {
  id: string;
}

class ShowMetaVendMesService {
  public async execute({ id }: IRequest): Promise<MetasVendedorMes> {
    const conn = getConnection('metasConn');
    const repository = conn.getCustomRepository(MetasVendMesRepository);

    const meta = await repository.findById(id);

    if (!meta) throw new AppError('Meta Semana Não Encontrada!');

    return meta;
  }
}

export default ShowMetaVendMesService;
