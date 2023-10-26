import { Router } from 'express';
import { createNewUser } from '../controllers/user-controllers';

const router: Router = Router();

router.post('/', createNewUser);

export default router;
