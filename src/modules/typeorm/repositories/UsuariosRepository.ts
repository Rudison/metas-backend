import { EntityRepository, Repository } from 'typeorm';
import Usuarios from '../entities/Usuarios';

@EntityRepository(Usuarios)
export class UsuariosRepository extends Repository<Usuarios> {
  //
  public async findById(id: string): Promise<Usuarios | undefined> {
    const usuario = this.findOne({
      where: { id }
    });
    return usuario;
  }

  public async findByName(nome: string): Promise<Usuarios | undefined> {
    const usuario = this.findOne({
      nome
    });

    return usuario;
  }

  public async findByEmail(email: string): Promise<Usuarios | undefined> {
    const usuario = this.findOne({
      email
    });

    return usuario;
  }
}
