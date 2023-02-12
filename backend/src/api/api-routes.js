import express from 'express';
import cors from 'cors';

import menuItems from './menuItems/menuItem-routes';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.use(menuItems);

export default router;
