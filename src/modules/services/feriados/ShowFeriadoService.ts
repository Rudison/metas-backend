import AppError from '@shared/errors/AppError';
import { getConnection } from 'typeorm';
import Feriado from '../../typeorm/entities/Feriado';
import { FeriadoRepository } from '../../typeorm/repositories/FeriadoRepository';

interface IRequest {
  id: string;
}

class ShowFeriadoService {
  public async execute({ id }: IRequest): Promise<Feriado> {
    const conn = getConnection('metasConn');
    const feriadosRepository = conn.getCustomRepository(FeriadoRepository);

    const feriado = await feriadosRepository.findOne(id);

    if (!feriado) throw new AppError('Feriado Não Encontrado!');

    return feriado;
  }
}
export default ShowFeriadoService;
