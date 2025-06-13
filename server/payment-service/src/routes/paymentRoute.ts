import { Router } from "express";
import { makePayment } from "../controllers/paymentController";

const paymentRouter = Router()

paymentRouter.post("/payment",makePayment)

export default paymentRouter