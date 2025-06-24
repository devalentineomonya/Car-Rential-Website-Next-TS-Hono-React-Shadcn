CREATE TABLE IF NOT EXISTS "cars" (
	"id" text PRIMARY KEY NOT NULL,
	"owner_id" text,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"images" jsonb NOT NULL,
	"date_manufactured" timestamp NOT NULL,
	"make" text NOT NULL,
	"model" text NOT NULL,
	"mileage" integer NOT NULL,
	"color" text NOT NULL,
	"price_per_day" integer,
	"price_per_km" integer,
	"is_for_delivery" boolean DEFAULT false NOT NULL,
	"is_available" boolean DEFAULT true NOT NULL,
	"is_for_hire" boolean DEFAULT false NOT NULL,
	"is_for_rent" boolean DEFAULT false NOT NULL,
	"body_type" text NOT NULL,
	"fuel_type" text NOT NULL,
	"transmission" text NOT NULL,
	"drive_type" text NOT NULL,
	"condition" text NOT NULL,
	"engine_size" integer NOT NULL,
	"doors" integer NOT NULL,
	"cylinders" integer NOT NULL,
	"features" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cars" ADD CONSTRAINT "cars_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
