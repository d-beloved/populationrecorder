import { Router } from 'express';
import locationRoutes from './locationRoutes';
import notFound from './welcome';

const router = Router();
router.use('/api', locationRoutes);
router.all('*', notFound);

export default router;
