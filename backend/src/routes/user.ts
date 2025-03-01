// create a router

import { Router } from 'express';
import { validateUser } from '../auth';

const router = Router();

router.get('/', validateUser, (req, res) => {
  res.send('Hello from user router');
});

export default router;
