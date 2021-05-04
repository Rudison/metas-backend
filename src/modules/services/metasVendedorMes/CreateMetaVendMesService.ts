import MetasVendedorMes from '@modules/typeorm/entities/MetasVendedorMes';
import { MetasVendMesRepository } from '@modules/typeorm/repositories/MetasVendMesRepository';
import { MetasVendSemRepository } from '@modules/typeorm/repositories/MetasVendSemRepository';
import AppError from '@shared/errors/AppError';
import { getConnection } from 'typeorm';

interface IRequest {
  metaId: string;
  vendedorId: string;
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
    const repositoryVendSemana = conn.getCustomRepository(
      MetasVendSemRepository
    );

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

    const existeSemana = await repositoryVendSemana.findByMetaId(metaId);

    if (existeSemana) {
      const semanas = await repositoryVendSemana
        .createQueryBuilder('a')
        .select('distinct b.id as "id"')
        .addSelect('b."semanaId"')
        .addSelect('b."diasUteisSemana"')
        .innerJoin(
          'MetasSemana',
          'b',
          'b."metaId" = a."metaId" and b.id = a."metaSemanaId"'
        )
        .where('a."metaId" = :metaId', { metaId })
        .orderBy('b."semanaId"')
        .getRawMany();

      //CADASTRAR A SEMANA MENSAL GERAL POR VENDEDOR
      //apena a meta do mes
      let mensal = {
        id: null,
        semanaId: null,
        diasUteisSemana: 0
      };

      mensal = semanas.filter(f => f.semanaId == 6)[0];

      const metaSemanaVend = {
        metaId: metaId,
        metaSemanaId: mensal.id,
        vendedorId: vendedorId,
        valorRealizado: 0,
        valorPrevisto: valorMetaMensal || 0,
        percentual: 0
      };

      repositoryVendSemana.create(metaSemanaVend);
      repositoryVendSemana.save(metaSemanaVend);

      let semanasVend = [
        {
          id: null,
          semanaId: null,
          diasUteisSemana: 0
        }
      ];

      semanasVend = semanas.filter(f => f.semanaId != 6);

      let valorPrevisto = 0;
      let valorPrevistoAnterior = 0;
      let valorProximaSemana = 0;
      let diasFaltantes = 0;
      let diasUteisMes = 0;

      semanasVend.forEach(item => {
        if (diasFaltantes == 0) diasFaltantes += item.diasUteisSemana;

        if (valorPrevistoAnterior == 0) {
          valorPrevisto =
            (valorMetaMensal / mensal.diasUteisSemana) * item.diasUteisSemana ||
            0;
          valorPrevistoAnterior = valorPrevisto;
        } else {
          if (valorProximaSemana == 0)
            valorProximaSemana = valorMetaMensal - valorPrevistoAnterior; //108000

          diasUteisMes = mensal.diasUteisSemana - diasFaltantes; //18

          valorPrevisto =
            (valorProximaSemana / diasUteisMes) * item.diasUteisSemana; //108000 / 18 * 6 = 36000

          diasFaltantes += item.diasUteisSemana; //

          valorProximaSemana -= valorPrevisto;
        }

        const metaVendSem = {
          metaSemanaId: item.id,
          metaId: metaId,
          vendedorId: vendedorId,
          valorRealizado: 0,
          valorPrevisto,
          percentual: 0
        };

        repositoryVendSemana.create(metaVendSem);
        repositoryVendSemana.save(metaVendSem);
      });
    }

    return meta;
  }
  //metaId, metaSemanaId, vendedorId, valorRealizado:0, valorPrevisto: 50000, percentual:0
}

export default CreateMetaVendMesService;
