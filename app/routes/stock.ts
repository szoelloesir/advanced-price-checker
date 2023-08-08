import { Router } from 'express';
import { getData } from '../controllers/stock';

const router = Router();

router.get('/:symbol', getData); // TODO: Use validators (is symbol existing) and maybe add interface for req
router.put('/:symbol', getData);

export default router;