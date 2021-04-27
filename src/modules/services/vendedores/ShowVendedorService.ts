import AppError from '@shared/errors/AppError';
import { getConnection } from 'typeorm';
import Vendedor from '../../typeorm/entities/Vendedor';
import { VendedorRepository } from '../../typeorm/repositories/VendedorRepository';

interface IRequest {
  id: string;
}

class ShowVendedorService {
  public async execute({ id }: IRequest): Promise<Vendedor> {
    const conn = await getConnection('metasConn');
    const vendedorRepository = conn.getCustomRepository(VendedorRepository);

    const vendedor = await vendedorRepository.findById(id);

    if (!vendedor) throw new AppError('Vendedor Não Encontrado!');

    return vendedor;
  }
}

export default ShowVendedorService;
