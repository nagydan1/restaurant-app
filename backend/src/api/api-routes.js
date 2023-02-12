import express from 'express';
import cors from 'cors';

import menuItems from './menuItems/MenuItem-routes';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.use(menuItems);

export default router;
