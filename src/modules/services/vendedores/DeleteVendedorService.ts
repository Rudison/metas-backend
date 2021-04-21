import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { VendedorRepository } from '../../typeorm/repositories/VendedorRepository';

interface IRequest {
  id: string;
}

class DeleteVendedorService {
  public async execute({ id }: IRequest): Promise<void> {
    const vendedorRepository = getCustomRepository(VendedorRepository);

    const vendedor = await vendedorRepository.findOne(id);
    console.log(vendedor);
    if (!vendedor) throw new AppError('Vendedor Não Encontrado!');

    await vendedorRepository.remove(vendedor);
  }
}
export default DeleteVendedorService;
