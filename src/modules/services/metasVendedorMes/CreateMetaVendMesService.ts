import MetasVendedorMes from '@modules/typeorm/entities/MetasVendedorMes';
import { MetasVendMesRepository } from '@modules/typeorm/repositories/MetasVendMesRepository';
import AppError from '@shared/errors/AppError';
import { getConnection } from 'typeorm';

interface IRequest {
  metaId: number;
  vendedorId: number;
  valorMetaMensal: number;
}

class CreateMetaVendMesService {
  public async execute({
    metaId,
    vendedorId,
    valorMetaMensal
  }: IRequest): Promise<MetasVendedorMes> {
    const conn = getConnection('metasConn');
    const repository = conn.getCustomRepository(MetasVendMesRepository);
    const metaVendedorExists = await repository.findByMetaVendedor(
      metaId,
      vendedorId
    );

    if (metaVendedorExists)
      throw new AppError('Meta já cadastrada p/ vendedor informado!');

    const meta = repository.create({
      metaId,
      vendedorId,
      valorMetaMensal
    });

    await repository.save(meta);

    return meta;
  }
}

export default CreateMetaVendMesService;
