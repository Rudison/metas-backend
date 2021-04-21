import { MetasSemanaRepository } from '@modules/typeorm/repositories/MetasSemanaRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
}

class DeleteMetaSemanaService {
  public async execute({ id }: IRequest): Promise<void> {
    const repository = getCustomRepository(MetasSemanaRepository);

    const meta = await repository.findOne(id);

    if (!meta) throw new AppError('Meta Semana Não Encontrada!');

    await repository.remove(meta);
  }
}
export default DeleteMetaSemanaService;
