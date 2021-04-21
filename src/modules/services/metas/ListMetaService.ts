import Metas from '@modules/typeorm/entities/Metas';
import { MetasRepository } from '@modules/typeorm/repositories/MetasRepository';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  ano: string;
}
class ListMetaService {
  public async execute(): Promise<Metas[] | undefined> {
    const repository = getCustomRepository(MetasRepository);

    const metas = await repository.find();

    return metas;
  }

  public async executePorAno({ ano }: IRequest): Promise<Metas[] | undefined> {
    const repository = getCustomRepository(MetasRepository);
    const metas = await repository.findByYear(ano);

    return metas;
  }

  public async getByCards({ ano }: IRequest): Promise<Metas[] | undefined> {
    const repository = getCustomRepository(MetasRepository);

    console.log('rsp');
    const vlrRealizadoVendSemanas = await repository
      .createQueryBuilder('a')
      .select('a.id')
      .addSelect('b.descricao || a.ano as "Mes"')
      .addSelect('a."valorMetaMensal",')
      .addSelect('a."valorMetaRealizadoMensal"')
      .addSelect('a."semanasNoMes",')
      .addSelect('a.percentual')
      .innerJoin('Meses', 'b', 'b.id = a."mesId"')
      .where('a.ano = :ano', { ano })
      .getRawMany();

    return vlrRealizadoVendSemanas;
  }
}

export default ListMetaService;
