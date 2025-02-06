CREATE TYPE "public"."application_status" AS ENUM('pending', 'applied', 'interviewing', 'offer', 'rejected');--> statement-breakpoint
CREATE TABLE "applications" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"status" "application_status" NOT NULL,
	"companyName" text NOT NULL,
	"jobTitle" text NOT NULL,
	"jobUrl" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "applications_jobUrl_userId_unique" UNIQUE("jobUrl","userId")
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"url" text NOT NULL,
	"userId" text NOT NULL,
	"applicationId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "documents_name_userId_unique" UNIQUE("name","userId")
);
--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_applicationId_applications_id_fk" FOREIGN KEY ("applicationId") REFERENCES "public"."applications"("id") ON DELETE no action ON UPDATE no action;