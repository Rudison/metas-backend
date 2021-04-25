import MetasSemana from '@modules/typeorm/entities/MetasSemana';
import { MetasSemanaRepository } from '@modules/typeorm/repositories/MetasSemanaRepository';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  metaId: string;
}
class ListMetaSemanaService {
  public async execute(): Promise<MetasSemana[]> {
    const repository = getCustomRepository(MetasSemanaRepository);

    const meta = await repository.find();

    return meta;
  }

  public async getByMeta({
    metaId
  }: IRequest): Promise<MetasSemana[] | undefined> {
    const repository = getCustomRepository(MetasSemanaRepository);

    const meta = await repository.findByMetaId(metaId);

    return meta;
  }

  public async getSemanasMes({
    metaId
  }: IRequest): Promise<MetasSemana[] | undefined> {
    const repository = getCustomRepository(MetasSemanaRepository);

    const semanasMes = await repository
      .createQueryBuilder('a')
      .select('a.id as "id"')
      .addSelect('a."metaId"')
      .addSelect('a."semanaId"')
      .addSelect('b.descricao as  "descricao"')
      .addSelect('a.dataInicial as "dataInicial"')
      .addSelect('a.dataFinal as "dataFinal"')
      .addSelect('a."diasUteisSemana" as "diasUteisSemana"')
      .innerJoin('Semanas', 'b', 'b.id = a."semanaId"')
      .where('a."metaId" = :metaId', { metaId })
      .orderBy('a."semanaId"')
      .getRawMany();

    return semanasMes;
  }

  public async getSemanasRestantes({
    metaId
  }: IRequest): Promise<MetasSemana | undefined> {
    const repository = getCustomRepository(MetasSemanaRepository);

    const semanasRestantes = await repository
      .createQueryBuilder('a')
      .select(
        ' distinct coalesce((b."semanasNoMes" - count(a.id)), 0) as "semanasRestantes"'
      )
      .addSelect('b."semanasNoMes" as "semanasNoMes"')
      .innerJoin('Metas', 'b', 'b.id = a."metaId"')
      .where('a."metaId" = :metaId', { metaId })
      .andWhere('a."semanaId" <> 6')
      .groupBy('b."semanasNoMes"')
      .getRawOne();

    return semanasRestantes;
  }
}

export default ListMetaSemanaService;
