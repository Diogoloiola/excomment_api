import express from 'express';
import { connection } from '../database/connection.js';

const router = express.Router();

import Handler from '../src/Handler.js';

const handler = new Handler(connection);

router.get('/repository/:id', (request, response) => handler.getTechnicalDebtFromRepository(request, response));
router.get('/projects', async (request, response) => handler.getProjects(request, response));
export default router;