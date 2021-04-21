import { Request, Response } from 'express';
import CreateVendedorService from '@modules/services/vendedores/CreateVendedorService';
import DeleteVendedorService from '@modules/services/vendedores/DeleteVendedorService';
import ListVendedorService from '@modules/services/vendedores/ListVendedorService';
import ShowVendedorService from '@modules/services/vendedores/ShowVendedorService';
import UpdateVendedorService from '@modules/services/vendedores/UpdateVendedorService';

export default class VendedoresController {
  //
  public async index(request: Request, response: Response): Promise<Response> {
    const listVendedores = new ListVendedorService();

    const vendedores = await listVendedores.execute();

    return response.json(vendedores);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showVendedor = new ShowVendedorService();

    const vendedor = await showVendedor.execute({ id });
    return response.json(vendedor);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { codVendBlue, nome, ativo, outros } = request.body;
    const createVendedor = new CreateVendedorService();
    const vendedor = await createVendedor.execute({
      codVendBlue,
      nome,
      ativo,
      outros
    });

    return response.json(vendedor);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { codVendBlue, nome, ativo, outros } = request.body;

    const updateVendedor = new UpdateVendedorService();
    const vendedor = await updateVendedor.execute({
      id,
      codVendBlue,
      nome,
      ativo,
      outros
    });
    console.log(vendedor);
    return response.json(vendedor);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteVendedor = new DeleteVendedorService();
    await deleteVendedor.execute({ id });

    return response.json([]);
  }
}
