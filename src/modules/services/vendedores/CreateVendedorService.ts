import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Vendedor from '../../typeorm/entities/Vendedor';
import { VendedorRepository } from '../../typeorm/repositories/VendedorRepository';

interface IRequest {
  codVendBlue: string;
  nome: string;
  ativo: boolean;
  outros: boolean;
}

class CreateVendedorService {
  //
  public async execute({
    codVendBlue,
    nome,
    ativo,
    outros
  }: IRequest): Promise<Vendedor> {
    const vendedorRepository = getCustomRepository(VendedorRepository);

    const codBlueExists = await vendedorRepository.findByCodBlue(codVendBlue);

    if (codBlueExists) throw new AppError('Cód Vend Blue Já Utilizado!');

    const vendedor = vendedorRepository.create({
      codVendBlue,
      nome,
      ativo,
      outros
    });

    await vendedorRepository.save(vendedor);

    return vendedor;
  }
}

export default CreateVendedorService;
