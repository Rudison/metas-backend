import { MetasVendMesRepository } from '@modules/typeorm/repositories/MetasVendMesRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
}

class DeleteMetaVendMesService {
  public async execute({ id }: IRequest): Promise<void> {
    const repository = getCustomRepository(MetasVendMesRepository);

    const meta = await repository.findOne(id);

    if (!meta) throw new AppError('Meta/Vendedor Não Encontrada!');

    await repository.remove(meta);
  }
}
export default DeleteMetaVendMesService;
