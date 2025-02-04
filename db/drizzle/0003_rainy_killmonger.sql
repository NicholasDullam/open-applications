ALTER TABLE "documents" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;