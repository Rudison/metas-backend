import { MetasVendMesRepository } from '@modules/typeorm/repositories/MetasVendMesRepository';
import { MetasVendSemRepository } from '@modules/typeorm/repositories/MetasVendSemRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
  metaId: string;
  vendedorId: string;
}

class DeleteMetaVendMesService {
  public async execute({ id, metaId, vendedorId }: IRequest): Promise<void> {
    const repository = getCustomRepository(MetasVendMesRepository);
    const repositoryMetaSemana = getCustomRepository(MetasVendSemRepository);

    const meta = await repository.findById(id);
    const existeMetaSemana = await repositoryMetaSemana.findByMetaVendId(
      metaId,
      vendedorId
    );

    if (!meta) throw new AppError('Meta Vendedor Mês Não Encontrado!');

    if (!existeMetaSemana)
      throw new AppError('Existe alguma Semana Relacionada!');

    await repository.remove(meta);
  }
}
export default DeleteMetaVendMesService;
