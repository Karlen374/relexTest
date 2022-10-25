import { Router } from "express";
import TestController from "../controllers/TestController.js";

const testRouter = new Router()

testRouter.post('/createTest', TestController.create);
testRouter.get('/getTests', TestController.getAll);
testRouter.put('/changeStatus', TestController.changeTestStatus);
testRouter.delete('/delTest', TestController.delTestById)

export default testRouter;