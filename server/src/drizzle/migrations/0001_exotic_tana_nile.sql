CREATE TYPE "public"."role" AS ENUM('user', 'hotel_owner', 'admin');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "roles" "role" DEFAULT 'user' NOT NULL;