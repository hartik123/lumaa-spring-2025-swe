import express from 'express';
import LoginController from '../controllers/LoginController.js';

const router = express.Router();

router.post('/login', LoginController, (error, req, res, next) => {
    res.status(400).send({error: error.message})
    }
)

export default router;