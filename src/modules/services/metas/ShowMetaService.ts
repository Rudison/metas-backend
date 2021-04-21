import Metas from '@modules/typeorm/entities/Metas';
import { MetasRepository } from '@modules/typeorm/repositories/MetasRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
}

class ShowMetaService {
  public async execute({ id }: IRequest): Promise<Metas> {
    const repository = getCustomRepository(MetasRepository);

    const meta = await repository.findById(id);

    if (!meta) throw new AppError('Meta Não Encontrada!');

    return meta;
  }
}

export default ShowMetaService;
