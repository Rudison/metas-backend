import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Feriado from '../../typeorm/entities/Feriado';
import { FeriadoRepository } from '../../typeorm/repositories/FeriadoRepository';

interface IRequest {
  descricao: string;
  dia: Date;
}
class CreateFeriadoService {
  public async execute({ descricao, dia }: IRequest): Promise<Feriado> {
    const feriadosRepository = getCustomRepository(FeriadoRepository);
    const diaExists = await feriadosRepository.findByDate(dia);

    if (diaExists) throw new AppError('Dia já cadastrado!');

    const feriado = feriadosRepository.create({
      descricao,
      dia
    });

    await feriadosRepository.save(feriado);

    return feriado;
  }
}
export default CreateFeriadoService;
