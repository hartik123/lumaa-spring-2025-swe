import SignUpController from '../controllers/SignUpController.js';
import express from 'express';

const router = express.Router();

router.post('/signup', SignUpController, (error, req, res, next) => {
    res.status(400).send({error: error.message})
    });

export default router;