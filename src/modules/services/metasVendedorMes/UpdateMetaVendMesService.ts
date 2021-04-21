import MetasVendedorMes from '@modules/typeorm/entities/MetasVendedorMes';
import { MetasVendMesRepository } from '@modules/typeorm/repositories/MetasVendMesRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
  valorMetaMensal: number;
}

class UpdateMetaVendMesService {
  public async execute({
    id,
    valorMetaMensal
  }: IRequest): Promise<MetasVendedorMes> {
    const repository = getCustomRepository(MetasVendMesRepository);

    const meta = await repository.findOne(id);

    if (!meta) throw new AppError('Meta/Vendedor Não Encontrada!');

    meta.valorMetaMensal = valorMetaMensal;

    await repository.save(meta);

    return meta;
  }
}

export default UpdateMetaVendMesService;
