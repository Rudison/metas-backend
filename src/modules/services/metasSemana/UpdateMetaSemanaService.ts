import MetasSemana from '@modules/typeorm/entities/MetasSemana';
import { MetasSemanaRepository } from '@modules/typeorm/repositories/MetasSemanaRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
  dataInicial: Date;
  dataFinal: Date;
  diasAdicionais?: number;
}

class UpdateMetaSemanaService {
  public async execute({
    id,
    dataInicial,
    dataFinal
  }: IRequest): Promise<MetasSemana> {
    const repository = getCustomRepository(MetasSemanaRepository);

    const meta = await repository.findOne(id);

    if (!meta) throw new AppError('Meta Semana Não Encontrada!');

    meta.dataInicial = dataInicial;
    meta.dataFinal = dataFinal;

    await repository.save(meta);

    return meta;
  }
}

export default UpdateMetaSemanaService;
