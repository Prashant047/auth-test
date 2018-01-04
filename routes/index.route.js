import express from 'express';
import {something} from '../controllers/main.controller';
const router = express.Router();

router.get('/', something);

export default router;