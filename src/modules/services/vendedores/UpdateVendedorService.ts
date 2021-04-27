import AppError from '@shared/errors/AppError';
import { getConnection } from 'typeorm';
import Vendedor from '../../typeorm/entities/Vendedor';
import { VendedorRepository } from '../../typeorm/repositories/VendedorRepository';

interface IRequest {
  id: string;
  codVendBlue: string;
  nome: string;
  ativo: boolean;
  outros: boolean;
}

class UpdateVendedorService {
  public async execute({
    id,
    codVendBlue,
    nome,
    ativo,
    outros
  }: IRequest): Promise<Vendedor> {
    const conn = await getConnection('metasConn');
    const vendedorReposiory = conn.getCustomRepository(VendedorRepository);

    const vendedor = await vendedorReposiory.findOne(id);

    if (!vendedor) throw new AppError('Vendedor Não Encontrado!');
    //depois implementar regra de duplicidade no codigo vend blue
    const codVendBlueExists = await vendedorReposiory.findByCodBlue(
      codVendBlue
    );

    if (vendedor.id != codVendBlueExists?.id)
      if (codVendBlueExists) throw new AppError('Cod Vendedor Blue Já Existe!');

    vendedor.codVendBlue = codVendBlue;
    vendedor.nome = nome;
    vendedor.ativo = ativo;
    vendedor.outros = outros;
    await vendedorReposiory.save(vendedor);

    return vendedor;
  }
}

export default UpdateVendedorService;
