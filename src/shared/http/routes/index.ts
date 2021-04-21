import feriadosRouter from '@modules/routes/feriados/feriados.routes';
import metasRouter from '@modules/routes/metas/metas.routes';
import metasSemanaRouter from '@modules/routes/metasSemana/metasSemana.routes';
import metasVendMesRouter from '@modules/routes/metasVendedorMes/metasVendMes.routes';
import metasVendSemRouter from '@modules/routes/metasVendedorSemana/metasVendedorSem.routes';
import sessionsRouter from '@modules/routes/usuarios/sessions.routes';
import usuariosRouter from '@modules/routes/usuarios/usuarios.routes';
import vendedorRouter from '@modules/routes/vendedores/vendedores.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/feriados', feriadosRouter);
routes.use('/vendedores', vendedorRouter);
routes.use('/usuarios', usuariosRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/metas', metasRouter);
routes.use('/metasVendedorMes', metasVendMesRouter);
routes.use('/metasSemana', metasSemanaRouter);
routes.use('/metasVendedorSemana', metasVendSemRouter);

export default routes;
