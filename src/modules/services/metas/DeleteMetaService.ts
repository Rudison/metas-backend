import { MetasRepository } from '@modules/typeorm/repositories/MetasRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
}

class DeleteMetaService {
  public async execute({ id }: IRequest): Promise<void> {
    const repository = getCustomRepository(MetasRepository);

    const meta = await repository.findOne(id);
    // console.log(meta);
    if (!meta) throw new AppError('Meta Não Encontrada!');

    await repository.remove(meta);
  }
}
export default DeleteMetaService;
