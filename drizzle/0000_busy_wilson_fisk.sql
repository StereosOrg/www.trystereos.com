CREATE TYPE "public"."partner_status" AS ENUM('pending', 'active', 'inactive', 'suspended');--> statement-breakpoint
CREATE TYPE "public"."partner_tier" AS ENUM('bronze', 'silver', 'gold', 'platinum');--> statement-breakpoint
CREATE TYPE "public"."partner_type" AS ENUM('affiliate', 'reseller', 'integration', 'strategic');--> statement-breakpoint
CREATE TYPE "public"."referral_type" AS ENUM('click', 'signup');--> statement-breakpoint
CREATE TABLE "Partner" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"partner_code" text NOT NULL,
	"tier" "partner_tier" DEFAULT 'bronze' NOT NULL,
	"status" "partner_status" DEFAULT 'pending' NOT NULL,
	"audience_size" integer,
	"industry" text,
	"type" "partner_type",
	"image_url" text,
	"user_id" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone,
	CONSTRAINT "Partner_partner_code_unique" UNIQUE("partner_code")
);
--> statement-breakpoint
CREATE TABLE "Referral" (
	"id" text PRIMARY KEY NOT NULL,
	"partner_id" text NOT NULL,
	"referral_type" "referral_type" NOT NULL,
	"referred_email" text,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_partner_id_Partner_id_fk" FOREIGN KEY ("partner_id") REFERENCES "public"."Partner"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "Partner_partner_code_idx" ON "Partner" USING btree ("partner_code");--> statement-breakpoint
CREATE INDEX "Referral_partner_id_idx" ON "Referral" USING btree ("partner_id");