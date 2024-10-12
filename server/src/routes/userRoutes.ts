import { Hono } from 'hono';
import { createUser, getUsers, getUser, updateUser, deleteUser } from '../controllers/userController';

const router = new Hono();

router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
