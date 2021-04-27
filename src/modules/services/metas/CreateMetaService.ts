import Metas from '@modules/typeorm/entities/Metas';
import { FeriadoRepository } from '@modules/typeorm/repositories/FeriadoRepository';
import { MetasRepository } from '@modules/typeorm/repositories/MetasRepository';
import AppError from '@shared/errors/AppError';
import moment from 'moment';
import { getConnection } from 'typeorm';

interface IRequest {
  mesId: number;
  ano: number;
  valorMetaMensal: number;
  semanasNoMes: number;
}
class CreateMetaService {
  public async execute({
    mesId,
    ano,
    valorMetaMensal,
    semanasNoMes
  }: IRequest): Promise<Metas> {
    const conn = getConnection('metasConn');
    const repository = conn.getCustomRepository(MetasRepository);
    const mesAnoExists = await repository.findByMonthYear(mesId, ano);

    if (mesAnoExists)
      throw new AppError('Já existe um lançamento para o mês/ano!');

    const mes = mesId - 1;

    const primeiroDiaMes = new Date(ano, mes);
    const ultimoDiaMes = new Date(ano, mes + 1, 0);

    const diasUteisMes = obterDiasNoPeriodo(
      primeiroDiaMes,
      ultimoDiaMes
    ).filter(dia => dia.getDay() > 0);

    const feriadosRepository = conn.getCustomRepository(FeriadoRepository);

    const feriados = await feriadosRepository.findAll();
    const diasFeriados = feriados.map(d => moment(d.dia).toDate());

    const diaFeriadoNoMes = (diasFeriado: Date[], diasPeriodo: Date[]) => {
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

    const feriadosNoMes = diaFeriadoNoMes(diasFeriados, diasUteisMes);

    const diasUteisTrabalho = diasUteisMes.length - feriadosNoMes;

    const meta = repository.create({
      mesId,
      ano,
      valorMetaMensal,
      valorMetaRealizadoMensal: 0,
      percentual: 0,
      semanasNoMes,
      diasUteisMes: diasUteisTrabalho
    });
    await repository.save(meta);

    return meta;
  }
}

const obterDiasNoPeriodo = (dtIni: Date, dtFinal: Date) => {
  let datas = [];
  const dia = new Date(dtIni);
  while (dia <= dtFinal) {
    datas = [...datas, new Date(dia)];
    dia.setDate(dia.getDate() + 1);
  }
  return datas;
};

// function obterDiasUteisMes(ano: number, mes: number) {
//   const dias = ((year, month) =>
//     new Array(32 - new Date(year, month, 32).getDate())
//       .fill(1)
//       .filter(
//         (id, index) =>
//           [0, 7].indexOf(new Date(year, month, index + 1).getDay()) === -1
//       ).length)(ano, mes);
//   return dias;
// }

export default CreateMetaService;
