import { Router } from 'express';
import partnersRouter from '../../../modules/partners/routes/parters.routes';
import sessionsRouter from '@modules/partners/routes/sessions.routes';
import passwordRouter from '@modules/partners/routes/password.routes';
import profileRouter from '@modules/partners/routes/profile.routes';
import adsRouter from '@modules/ads/routes/ads.routes';
import partnerInterestRouter from '@modules/interest/routes/partnersInterest.routes';
import interestRouter from '@modules/interest/routes/interest.routes';
import plansRouter from '@modules/plans/routes/plans.routes';
import interestAdsRouter from '@modules/interest/routes/partnersInterestAds.routes';
import photoAdsRouter from '@modules/ads/routes/photoAds.routes';

const routes = Router();

routes.use('/partners', partnersRouter);
routes.use('/partners_interest', partnerInterestRouter);
routes.use('/interest', interestRouter);
routes.use('/interest_ads', interestAdsRouter);
routes.use('/plans', plansRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/ads', adsRouter);
routes.use('/photo_ads', photoAdsRouter);

export default routes;
