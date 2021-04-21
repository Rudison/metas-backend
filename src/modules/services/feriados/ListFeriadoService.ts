import { getCustomRepository } from 'typeorm';
import Feriado from '../../typeorm/entities/Feriado';
import { FeriadoRepository } from '../../typeorm/repositories/FeriadoRepository';

class ListFeriadoService {
  public async execute(): Promise<Feriado[]> {
    const feriadosRepository = getCustomRepository(FeriadoRepository);

    const feriados = await feriadosRepository.find();

    return feriados;
  }
}
export default ListFeriadoService;
