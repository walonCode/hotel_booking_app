import { createMiddleware } from "hono/factory";
import type { ZodSchema, infer as zInfer} from "zod";

export const validateBody = <T extends ZodSchema>(schema: T) =>
  createMiddleware<{
    Variables:{
      validatedData: zInfer<T>
    }
  }>(async (c, next) => {
    
    const body = await c.req.json().catch(() => null);

    const result = schema.safeParse(body);
    if (!result.success) {
      return c.json(
        {
          ok: false,
          error: "Invalid request body",
          issues: result.error.format(),
        },
        400
      );
    }

    c.set("validatedData", result.data);
    await next();
  });
