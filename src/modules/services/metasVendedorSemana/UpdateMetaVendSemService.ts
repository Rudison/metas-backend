import MetasVendedorSemana from '@modules/typeorm/entities/MetasVendedorSemana';
import { MetasVendSemRepository } from '@modules/typeorm/repositories/MetasVendSemRepository';
import AppError from '@shared/errors/AppError';
import { getConnection } from 'typeorm';

interface IRequest {
  id: string;
  valorPrevisto: number;
}
interface IRequestUpdate {
  metaId: string;
  vendedorId: string;
  valorPrevisto: number;
}

interface IRequestUpdateRealizado {
  metaId: string;
  semanaId: string;
  codVendBlue: string;
  valorRealizado: number;
}
class UpdateMetaVendSemService {
  public async execute({
    id,
    valorPrevisto
  }: IRequest): Promise<MetasVendedorSemana> {
    const conn = getConnection('metasConn');
    const repository = conn.getCustomRepository(MetasVendSemRepository);

    const meta = await repository.findById(id);

    if (!meta) throw new AppError('Meta Semana Não Encontrada!');

    meta.valorPrevisto = valorPrevisto;

    await repository.save(meta);

    return meta;
  }

  public async updateMetaVendMes({
    metaId,
    vendedorId,
    valorPrevisto
  }: IRequestUpdate): Promise<MetasVendedorSemana> {
    const conn = getConnection('metasConn');
    const repository = conn.getCustomRepository(MetasVendSemRepository);

    const { id } = await repository
      .createQueryBuilder('a')
      .select('a.id as "id"')
      .innerJoin(
        'MetasSemana',
        'b',
        'b."metaId" = a."metaId" and b.id = a."metaSemanaId"'
      )
      .where('a."metaId" = :metaId', { metaId })
      .andWhere('a."vendedorId" = :vendedorId', { vendedorId })
      .andWhere('b."semanaId" = 6')
      .getRawOne();

    const meta = await repository.findById(id);

    if (!meta) throw new AppError('Meta Semana Não Encontrada!');

    meta.valorPrevisto = valorPrevisto;

    await repository.save(meta);

    return meta;
  }

  public async updateValorRealizadoSemana({
    metaId,
    semanaId,
    codVendBlue,
    valorRealizado
  }: IRequestUpdateRealizado): Promise<MetasVendedorSemana> {
    const conn = getConnection('metasConn');
    const repository = conn.getCustomRepository(MetasVendSemRepository);

    const { id } = await repository
      .createQueryBuilder('a')
      .select('a.id as "id"')
      .innerJoin(
        'MetasSemana',
        'b',
        'b."metaId" = a."metaId" and b.id = a."metaSemanaId"'
      )
      .innerJoin('Vendedores', 'c', 'c.id = a."vendedorId"')
      .where('a."metaId" = :metaId', { metaId })
      .andWhere('b."semanaId" = :semanaId', { semanaId })
      .andWhere(`c."codVendBlue" = ${codVendBlue}`)
      .getRawOne();

    const meta = await repository.findById(id);
    if (!meta) throw new AppError('Meta Semana Não Encontrada!');
    console.log('entrou');
    meta.valorRealizado = valorRealizado;

    await repository.save(meta);

    return meta;
  }
}

export default UpdateMetaVendSemService;
