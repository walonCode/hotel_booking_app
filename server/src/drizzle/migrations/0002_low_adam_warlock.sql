CREATE TYPE "public"."status" AS ENUM('pending', 'completed', 'cancel');--> statement-breakpoint
ALTER TABLE "bookings" ALTER COLUMN "status" SET DEFAULT 'pending'::"public"."status";--> statement-breakpoint
ALTER TABLE "bookings" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::"public"."status";