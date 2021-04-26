import MetasSemana from '@modules/typeorm/entities/MetasSemana';
import { FeriadoRepository } from '@modules/typeorm/repositories/FeriadoRepository';
import { MetasRepository } from '@modules/typeorm/repositories/MetasRepository';
import { MetasSemanaRepository } from '@modules/typeorm/repositories/MetasSemanaRepository';
import { MetasVendMesRepository } from '@modules/typeorm/repositories/MetasVendMesRepository';
import { MetasVendSemRepository } from '@modules/typeorm/repositories/MetasVendSemRepository';
import AppError from '@shared/errors/AppError';
import moment from 'moment';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  metaId: number;
  semanaId: number;
  dataInicial: Date;
  dataFinal: Date;
  diasUteisSemana: number;
  diasAdicionais: number;
  incluirFeriadoDaSemana: boolean;
}

class CreateMetaSemanaService {
  public async execute({
    metaId,
    semanaId,
    dataInicial,
    dataFinal,
    diasUteisSemana,
    diasAdicionais,
    incluirFeriadoDaSemana
  }: IRequest): Promise<MetasSemana | undefined> {
    const repositoryMetaSemana = getCustomRepository(MetasSemanaRepository);
    const repositoryMeta = getCustomRepository(MetasRepository);
    const repositoryMetaVendSemana = getCustomRepository(
      MetasVendSemRepository
    );
    const repositoryMetaVenMes = getCustomRepository(MetasVendMesRepository);
    const feriadosRepository = getCustomRepository(FeriadoRepository);
    const metaSemanaExists = await repositoryMetaSemana.findByMetaSemanaId(
      metaId,
      semanaId
    );

    let retornoMeta = {
      id: 1,
      metaId,
      semanaId,
      dataInicial,
      dataFinal,
      diasUteisSemana
    };

    if (metaSemanaExists)
      throw new AppError('Semana já existente para esse mês!');

    const existePrimeiraMeta = await repositoryMetaVendSemana.findByMetaId(
      metaId
    );

    const { diasUteisMes } = await repositoryMeta.findById(metaId);

    const diasUteisNoPeriodo = obterDiasNoPeriodo(
      dataInicial,
      dataFinal
    ).filter(dia => dia.getDay() > 0);

    const feriados = await feriadosRepository.findAll();
    const diasFeriados = feriados.map(d => moment(d.dia).toDate());

    const diaFeriadoNaSemana = (diasFeriado: Date[], diasPeriodo: Date[]) => {
      const final = [];
      diasPeriodo.forEach(d1 =>
        diasFeriado.forEach(d2 => {
          if (d1.getTime() == d2.getTime()) {
            final.push(d1);
          }
        })
      );
      return final.length || 0;
    };

    const diasFeriadoSemana = diaFeriadoNaSemana(
      diasFeriados,
      diasUteisNoPeriodo
    );

    let diasUteisTrabalho = diasUteisNoPeriodo.length - diasFeriadoSemana;

    if (incluirFeriadoDaSemana) {
      diasUteisTrabalho += diasFeriadoSemana;
    }
    diasAdicionais += diasUteisTrabalho;

    diasUteisSemana = diasAdicionais;

    //SE FOR O PRIMEIRO LANÇAMENTO DA SEMANA
    if (!existePrimeiraMeta) {
      const meta = repositoryMetaSemana.create({
        metaId,
        semanaId,
        dataInicial,
        dataFinal,
        diasUteisSemana
      });
      await repositoryMetaSemana.save(meta);

      retornoMeta.id = meta.id;
      retornoMeta.semanaId = meta.semanaId;
      retornoMeta.dataInicial = meta.dataInicial;
      retornoMeta.dataFinal = meta.dataFinal;
      retornoMeta.diasUteisSemana = meta.diasUteisSemana;

      const mesLancamento = dataInicial.getMonth();
      const anoLancamento = dataInicial.getFullYear();

      const primeiroDiaMes = new Date(anoLancamento, mesLancamento);
      const ultimoDiaMes = new Date(anoLancamento, mesLancamento + 1, 0);

      const vendedoresMetasMes = await repositoryMetaVenMes.findByMetaId(
        metaId
      );

      const metaSemanaMensal = repositoryMetaSemana.create({
        metaId,
        semanaId: 6,
        dataInicial: primeiroDiaMes,
        dataFinal: ultimoDiaMes,
        diasUteisSemana: diasUteisMes
      });
      await repositoryMetaSemana.save(metaSemanaMensal);

      //CADASTRAR A SEMANA MENSAL GERAL POR VENDEDOR
      vendedoresMetasMes?.forEach(item => {
        const metaMensal = {
          metaId: metaId,
          metaSemanaId: metaSemanaMensal.id,
          vendedorId: item.vendedorId,
          valorRealizado: 0,
          valorPrevisto: item.valorMetaMensal || 0,
          percentual: 0
        };
        repositoryMetaVendSemana.create(metaMensal);
        repositoryMetaVendSemana.save(metaMensal);
      });

      let valorMetaSemana = 0;
      const metaVendedoresSem = [];

      vendedoresMetasMes?.forEach(item => {
        valorMetaSemana =
          (item.valorMetaMensal / diasUteisMes) * diasUteisSemana || 0;

        metaVendedoresSem.push({
          vendedorId: item.vendedorId,
          metaId: item.metaId,
          valorPrevisto: Math.ceil(valorMetaSemana)
        });
      });

      metaVendedoresSem.forEach(item => {
        const metaVendSem = {
          metaSemanaId: meta.id,
          metaId: item.metaId,
          vendedorId: item.vendedorId,
          valorRealizado: 0,
          valorPrevisto: item.valorPrevisto || 0,
          percentual: 0
        };
        repositoryMetaVendSemana.create(metaVendSem);
        repositoryMetaVendSemana.save(metaVendSem);
      });

      return meta;
    } else {
      if (semanaId < 6) {
        const diasUteisTodasSemanas =
          (await repositoryMetaSemana
            .createQueryBuilder('MetasSemana')
            .select('SUM("diasUteisSemana") as diasUteisSemana')
            .where('"metaId" = :metaId', { metaId })
            .andWhere('"semanaId" <> 6 ')
            .getRawMany()) || 0;

        const metaSemana = repositoryMetaSemana.create({
          metaId,
          semanaId,
          dataInicial,
          dataFinal,
          diasUteisSemana
        });
        await repositoryMetaSemana.save(metaSemana);

        const vlrRealizadoVendSemanas = await repositoryMetaVendSemana
          .createQueryBuilder('a')
          .select('a."vendedorId"')
          .addSelect('SUM(a."valorRealizado") as "valorRealizado"')
          .addSelect('b."valorMetaMensal"')
          .innerJoin(
            'MetasVendedorMes',
            'b',
            'b."metaId" = a."metaId" and b."vendedorId" = a."vendedorId"'
          )
          .innerJoin('Vendedores', 'c', 'c.id = b."vendedorId"')
          .where('a."metaId" = :metaId', { metaId })
          .andWhere('c."outros" = false')
          .groupBy('a."vendedorId"')
          .addGroupBy('b."valorMetaMensal"')
          .getRawMany();

        const diasRestantesMes =
          diasUteisMes - diasUteisTodasSemanas[0].diasuteissemana;

        vlrRealizadoVendSemanas.map(item => {
          const valorPrevisto = Math.ceil(
            ((item.valorMetaMensal - item.valorRealizado) / diasRestantesMes) *
              diasUteisSemana
          );

          const metaVendSem = {
            metaSemanaId: metaSemana.id,
            metaId: metaId,
            vendedorId: item.vendedorId,
            valorRealizado: 0,
            valorPrevisto,
            percentual: 0
          };
          repositoryMetaVendSemana.create(metaVendSem);
          repositoryMetaVendSemana.save(metaVendSem);
        });
      }
    }
    return retornoMeta;
  }
}

// function diasEntreDatas(dataInicial: Date, dataFinal: Date) {
//   const diff = Math.abs(dataFinal.getTime() - dataInicial.getTime()); // Subtrai uma data pela outra
//   const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));
//   return dias;
// }

const obterDiasNoPeriodo = (dtIni: Date, dtFinal: Date) => {
  let datas = [];
  const dia = new Date(dtIni);
  while (dia <= dtFinal) {
    datas = [...datas, new Date(dia)];
    dia.setDate(dia.getDate() + 1);
  }
  return datas;
};

export default CreateMetaSemanaService;
