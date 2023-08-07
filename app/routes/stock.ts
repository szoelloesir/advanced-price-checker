import { Router } from 'express';
import { getData } from '../controllers/stock';

const router = Router();

router.get('/:symbol', getData);

router.put('/:symbol', getData);

export default router;