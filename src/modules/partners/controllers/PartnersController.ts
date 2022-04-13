import { Request, Response } from 'express';
import CreatePartnersService from '../services/CreatePartnersService';
import DeletePartnersService from '../services/DeletePartnersService';
import ListPartnersService from '../services/ListPartnersService';
import ShowPartnersService from '../services/ShowPartnersService';
import UpdatePartnersService from '../services/UpdatePartnersService';

class PartnersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listPartners = new ListPartnersService();

    const partners = await listPartners.execute();

    return res.json(partners);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showPartners = new ShowPartnersService();

    const partners = await showPartners.execute({ id });

    return res.json(partners);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      phone,
      admin,
      cnpj_cpf,
      address,
      number,
      complements,
      district,
      city,
      state,
      country,
      zip,
      contact,
      landline,
      stop_ads,
      all_ads,
      active,
    } = req.body;

    const createPartners = new CreatePartnersService();

    const partners = await createPartners.execute({
      name,
      email,
      password,
      phone,
      admin,
      cnpj_cpf,
      address,
      number,
      complements,
      district,
      city,
      state,
      country,
      zip,
      contact,
      landline,
      stop_ads,
      all_ads,
      active,
    });

    return res.json(partners);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      phone,
      admin,
      cnpj_cpf,
      address,
      number,
      complements,
      district,
      city,
      state,
      country,
      zip,
      contact,
      landline,
      stop_ads,
      all_ads,
      active,
    } = req.body;
    const { id } = req.params;

    const updatePartners = new UpdatePartnersService();

    const partners = await updatePartners.execute({
      id,
      name,
      email,
      phone,
      admin,
      cnpj_cpf,
      address,
      number,
      complements,
      district,
      city,
      state,
      country,
      zip,
      contact,
      landline,
      stop_ads,
      all_ads,
      active,
    });

    return res.json(partners);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deletePartners = new DeletePartnersService();

    await deletePartners.execute({ id });

    return res.json([]);
  }
}
export default PartnersController;
