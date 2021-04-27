import AppError from '@shared/errors/AppError';
import { getConnection } from 'typeorm';
import { FeriadoRepository } from '../../typeorm/repositories/FeriadoRepository';

interface IRequest {
  id: string;
}

class DeleteFeriadoService {
  public async execute({ id }: IRequest): Promise<void> {
    const conn = getConnection('metasConn');
    const feriadosRepository = conn.getCustomRepository(FeriadoRepository);

    const feriado = await feriadosRepository.findOne(id);

    if (!feriado) throw new AppError('Feriado Não Encontrado!');

    await feriadosRepository.remove(feriado);
  }
}
export default DeleteFeriadoService;
