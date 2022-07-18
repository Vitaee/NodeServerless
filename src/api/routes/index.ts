import { Router } from 'express'
import projectsRouter from './project'
import usersRouter from './user'

const router = Router();

router.use('/user', usersRouter);
router.use('/project', projectsRouter);

export default router