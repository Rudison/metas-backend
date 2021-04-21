import { getCustomRepository } from 'typeorm';
import Vendedor from '../../typeorm/entities/Vendedor';
import { VendedorRepository } from '../../typeorm/repositories/VendedorRepository';

class ListVendedorService {
  public async execute(): Promise<Vendedor[]> {
    const vendedorRepository = getCustomRepository(VendedorRepository);

    const vendedor = await vendedorRepository.find();

    return vendedor;
  }
}

export default ListVendedorService;
