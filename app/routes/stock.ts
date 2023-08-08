import { Router } from 'express';
import { getData, postTrigger } from '../controllers/stock';

const router = Router();

router.get('/:symbol', getData); // TODO: Use validators (is symbol existing) and maybe add interface for req
router.put('/:symbol', postTrigger);

export default router;