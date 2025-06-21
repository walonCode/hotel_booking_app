import { config } from "../config/configs.js";
import { drizzle } from "drizzle-orm/node-postgres"
import * as schema from "../db/schema.js"
import { Client } from "pg";

const client = new Client({
    connectionString: config.DATABASE_URL,
})

await client.connect()

export const db = drizzle(client, { schema })
