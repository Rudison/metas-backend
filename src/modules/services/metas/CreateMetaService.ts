import Metas from '@modules/typeorm/entities/Metas';
import { MetasRepository } from '@modules/typeorm/repositories/MetasRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

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
    const repository = getCustomRepository(MetasRepository);
    const mesAnoExists = await repository.findByMonthYear(mesId, ano);

    if (mesAnoExists)
      throw new AppError('Já existe um lançamento para o mês/ano!');

    const mes = mesId - 1;
    const diasUteisMes = obterDiasUteisMes(ano, mes);

    const meta = repository.create({
      mesId,
      ano,
      valorMetaMensal,
      valorMetaRealizadoMensal: 0,
      percentual: 0,
      semanasNoMes,
      diasUteisMes
    });

    await repository.save(meta);

    return meta;
  }
}

function obterDiasUteisMes(ano: number, mes: number) {
  const dias = ((year, month) =>
    new Array(32 - new Date(year, month, 32).getDate())
      .fill(1)
      .filter(
        (id, index) =>
          [0, 7].indexOf(new Date(year, month, index + 1).getDay()) === -1
      ).length)(ano, mes);
  return dias;
}

export default CreateMetaService;
