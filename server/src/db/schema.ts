import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
  real,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";


export const roleEnum = pgEnum("role",["user","hotel_owner", "admin"])
export const statusEnum = pgEnum("status",["pending","completed", "cancel"])

export const userTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password").notNull(),
  email: varchar("email").notNull().unique(),
  roles: roleEnum("roles").notNull().default("user")
});


export const hotelTable = pgTable("hotels", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  address: text("address").notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  stars: integer("stars").notNull(),
  amenities: text("amenities").array().notNull(),
  images: text("images").array().notNull(),
  ownerId: integer("owner_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  rooms: integer("rooms").default(0).notNull(),
  availableRoom: integer("available_room").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});


export const roomTable = pgTable("rooms", {
  id: serial("id").primaryKey(),
  hotelId: integer("hotel_id")
    .notNull()
    .references(() => hotelTable.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  capacity: integer("capacity").notNull(),
  amenities: text("amenities").array().notNull(),
  images: text("images").array().notNull(),
  isAvailable: boolean("is_available").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});


export const bookingTable = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  hotelId: integer("hotel_id")
    .notNull()
    .references(() => hotelTable.id, { onDelete: "cascade" }),
  roomId: integer("room_id")
    .notNull()
    .references(() => roomTable.id, { onDelete: "cascade" }),
  checkIn: timestamp("check_in", { withTimezone: true }).notNull(),
  checkOut: timestamp("check_out", { withTimezone: true }).notNull(),
  totalPrice: real("total_price").notNull(),
  isPaid: boolean("is_paid").default(false),
  status:statusEnum("status").default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});


export const paymentTable = pgTable("payments", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id")
    .notNull()
    .references(() => bookingTable.id, { onDelete: "cascade" }),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  amount: real("amount").notNull(),
  method: varchar("method", { length: 100 }).notNull(),
  status: varchar("status", { length: 50 }).default("pending"),
  paidAt: timestamp("paid_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
