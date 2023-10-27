import { Router } from 'express';
import { createNewUser, getUserByEmail } from '../controllers/user-controllers';

const router: Router = Router();

router.get('/:email', getUserByEmail);
router.post('/', createNewUser);

export default router;
