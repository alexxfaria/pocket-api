import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '../../../modules/partners/routes/users.routes';
import sessionsRouter from '@modules/partners/routes/sessions.routes';
import passwordRouter from '@modules/partners/routes/password.routes';
import profileRouter from '@modules/partners/routes/profile.routes';
import customersRouter from '@modules/customers/routes/customers.routes';
import ordersRouter from '@modules/orders/routes/orders.routes';
import adsRouter from '@modules/ads/routes/ads.routes';
import partnerInterestRouter from '@modules/interest/routes/partnersInterest.routes';
import interestRouter from '@modules/interest/routes/interest.routes';
import plansRouter from '@modules/plans/routes/plans.routes';
import interestAdsRouter from '@modules/interest/routes/partnersInterestAds.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/partners', usersRouter);
routes.use('/partners_interest', partnerInterestRouter);
routes.use('/interest', interestRouter);
routes.use('/interest_ads', interestAdsRouter);
routes.use('/plans', plansRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);
routes.use('/ads', adsRouter);

export default routes;
