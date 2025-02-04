ALTER TABLE "documents" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_jobUrl_unique" UNIQUE("jobUrl");--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_name_userId_unique" UNIQUE("name","userId");