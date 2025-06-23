import { createMiddleware } from "hono/factory";
import { promises as fs} from "fs"



export const loggerMiddleware = createMiddleware(async (c, next) => {
    const start = Date.now()

    await next()

    const duration = Date.now() - start

    const file = await fs.open(`./src/logs/server.logs`, "a")

    const forwarded = c.req.header('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim():"fake"
    
    const logEntry = `{
        IP Address: ${ip} |
        URL Path: ${c.req.url} |
        Method: ${c.req.method} |
        userAgent: ${c.req.header('User-Agent')} |
        duration: ${duration}ms |
        Timestamp: ${new Date().toISOString()} |
        StatuCode: ${c.res.status}
    }
    `
    await file.write(logEntry)
    await file.close()
})