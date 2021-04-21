import { MetasVendSemRepository } from '@modules/typeorm/repositories/MetasVendSemRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
}

class DeleteMetaVendSemService {
  public async execute({ id }: IRequest): Promise<void> {
    const repository = getCustomRepository(MetasVendSemRepository);

    const meta = await repository.findOne(id);

    if (!meta) throw new AppError('Meta Semana Não Encontrada!');

    await repository.remove(meta);
  }
}
export default DeleteMetaVendSemService;
