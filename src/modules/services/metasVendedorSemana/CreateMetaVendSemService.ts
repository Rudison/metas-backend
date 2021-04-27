import MetasVendedorSemana from '@modules/typeorm/entities/MetasVendedorSemana';
import { MetasVendSemRepository } from '@modules/typeorm/repositories/MetasVendSemRepository';
import AppError from '@shared/errors/AppError';
import { getConnection } from 'typeorm';

interface IRequest {
  metaSemanaId: number;
  vendedorId: number;
  valorRealizado: number;
  valorPrevisto: number;
}
class CreateMetaVendSemService {
  public async execute({
    metaSemanaId,
    vendedorId,
    valorRealizado,
    valorPrevisto
  }: IRequest): Promise<MetasVendedorSemana> {
    const conn = getConnection('metasConn');
    const repository = conn.getCustomRepository(MetasVendSemRepository);
    const metaVendedorExists = await repository.findByMetaSemanaVendedorId(
      metaSemanaId,
      vendedorId
    );

    if (metaVendedorExists)
      throw new AppError('Meta já cadastrada p/ vendedor informado!');

    const meta = repository.create({
      metaSemanaId,
      vendedorId,
      valorRealizado,
      valorPrevisto
    });

    await repository.save(meta);

    return meta;
  }
}

export default CreateMetaVendSemService;
