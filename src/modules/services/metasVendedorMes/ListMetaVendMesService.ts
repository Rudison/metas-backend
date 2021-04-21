import MetasVendedorMes from '@modules/typeorm/entities/MetasVendedorMes';
import { MetasVendMesRepository } from '@modules/typeorm/repositories/MetasVendMesRepository';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  metaId: string;
}

class ListMetaVendMesService {
  public async execute(): Promise<MetasVendedorMes[]> {
    const repository = getCustomRepository(MetasVendMesRepository);

    const meta = await repository.find();

    return meta;
  }

  public async executePorMeta({
    metaId
  }: IRequest): Promise<MetasVendedorMes[] | undefined> {
    const repository = getCustomRepository(MetasVendMesRepository);

    const meta = await repository.findByMetaId(metaId);

    return meta;
  }
}

export default ListMetaVendMesService;
