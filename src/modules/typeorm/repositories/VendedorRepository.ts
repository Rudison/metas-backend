import { EntityRepository, Repository } from 'typeorm';
import Vendedor from '../entities/Vendedor';

@EntityRepository(Vendedor)
export class VendedorRepository extends Repository<Vendedor> {
  public async findById(id: string): Promise<Vendedor | undefined> {
    const vendedor = this.findOne({
      where: { id }
    });

    return vendedor;
  }

  public async findByCodBlue(
    codVendBlue: string
  ): Promise<Vendedor | undefined> {
    const vendedor = this.findOne({
      where: { codVendBlue }
    });

    return vendedor;
  }

  public async findByNome(nome: string): Promise<Vendedor | undefined> {
    const vendedor = this.findOne({
      where: { nome }
    });

    return vendedor;
  }

  public async findByDropDown(): Promise<Vendedor[] | undefined> {
    const vendedor = this.find();

    return vendedor;
  }
}
