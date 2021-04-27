import AppError from '@shared/errors/AppError';
import { getConnection } from 'typeorm';
import { VendedorRepository } from '../../typeorm/repositories/VendedorRepository';

interface IRequest {
  id: string;
}

class DeleteVendedorService {
  public async execute({ id }: IRequest): Promise<void> {
    const conn = getConnection('metasConn');
    const vendedorRepository = conn.getCustomRepository(VendedorRepository);

    const vendedor = await vendedorRepository.findOne(id);

    if (!vendedor) throw new AppError('Vendedor Não Encontrado!');

    await vendedorRepository.remove(vendedor);
  }
}
export default DeleteVendedorService;
