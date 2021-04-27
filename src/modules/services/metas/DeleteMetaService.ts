import { MetasRepository } from '@modules/typeorm/repositories/MetasRepository';
import AppError from '@shared/errors/AppError';
import { getConnection } from 'typeorm';

interface IRequest {
  id: string;
}

class DeleteMetaService {
  public async execute({ id }: IRequest): Promise<void> {
    const conn = getConnection('metasConn');
    const repository = conn.getCustomRepository(MetasRepository);

    const meta = await repository.findById(id);
    if (!meta) throw new AppError('Meta Não Encontrada!');

    await repository.remove(meta);
  }
}
export default DeleteMetaService;
