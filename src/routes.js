import { Router } from 'express';

import cors from 'cors';

import UserController from './app/controllers/Usercontroller';

import SessionController from './app/controllers/SessionController';

import ScrapController from './app/controllers/ScrapController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
routes.use(cors());

routes.post('/users', UserController.store);

routes.get('/users', UserController.index);

routes.delete('/users/:id', UserController.delete);

routes.post('/login', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/scraps', ScrapController.store);

routes.get('/scraps', ScrapController.index);

routes.put('/scraps/:id', ScrapController.update);

routes.delete('/scraps/:id', ScrapController.delete);
export default routes;
