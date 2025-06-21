import { Hono } from "hono";


const app = new Hono().basePath("/booking")


export default app