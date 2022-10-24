import { Router } from "express";
import TestController from "../controllers/TestController.js";

const testRouter = new Router()

testRouter.post('/createTest', TestController.create);
testRouter.get('/getTests', TestController.getAll);
testRouter.put('/changeStatus', TestController.changeTestStatus);
export default testRouter;