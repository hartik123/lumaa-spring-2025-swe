import express from 'express';
import {CreateTaskController, GetTaskController, UpdateTaskController, DeleteTaskController} from '../controllers/TaskController.js';
const router = express.Router();

router.post('/create', CreateTaskController, (error, req, res, next) => {
    res.status(400).send({error: error.message})
    }   
)

router.get('/getAll', GetTaskController, (error, req, res, next) => {  
    res.status(400).send({error: error.message})
}
)

router.put('/update', UpdateTaskController, (error, req, res, next) => {
    res.status(400).send({error: error.message})
    }
)

router.delete('/delete/:taskId', DeleteTaskController, (error, req, res, next)=>{
    res.status(400).send({error: error.message})
})
export default router;