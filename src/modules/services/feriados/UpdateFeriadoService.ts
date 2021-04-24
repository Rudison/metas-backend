import AppError from '@shared/errors/AppError';
import { ConnectionIsNotSetError, getCustomRepository } from 'typeorm';
import Feriado from '../../typeorm/entities/Feriado';
import { FeriadoRepository } from '../../typeorm/repositories/FeriadoRepository';

interface IRequest {
  id: string;
  descricao: string;
  dia: Date;
}

class UpdateFeriadoService {
  public async execute({ id, descricao, dia }: IRequest): Promise<Feriado> {
    const feriadosRepository = getCustomRepository(FeriadoRepository);

    const feriado = await feriadosRepository.findOne(id);
    if (!feriado) throw new AppError('Feriado Não Encontrado!');

    const diaExists = await feriadosRepository.findByDate(dia);

    if (diaExists?.id != feriado.id)
      if (diaExists) throw new AppError('Dia Já Cadastrado!');

    feriado.descricao = descricao;
    feriado.dia = dia;

    await feriadosRepository.save(feriado);

    return feriado;
  }
}
export default UpdateFeriadoService;
