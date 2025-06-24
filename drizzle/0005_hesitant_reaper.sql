ALTER TABLE "cars" DROP CONSTRAINT "cars_owner_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cars" ADD CONSTRAINT "cars_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
