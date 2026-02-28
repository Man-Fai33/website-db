-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
CREATE TABLE `resumes_experience` (
	`exp_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`resume_id` integer NOT NULL,
	`company_name` text NOT NULL,
	`title` text,
	`start_date` text,
	`end_date` text,
	`duration_months` integer,
	`description` text,
	`tech_stack` text
);
--> statement-breakpoint
CREATE TABLE `resumes_skills` (
	`skill_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`resume_id` integer NOT NULL,
	`category` text NOT NULL,
	`skill_name` text NOT NULL,
	`proficiency` text
);
--> statement-breakpoint
CREATE TABLE `resumes_certifications` (
	`cert_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`resume_id` integer NOT NULL,
	`cert_name` text NOT NULL,
	`issuer` text,
	`issue_date` text
);
--> statement-breakpoint
CREATE TABLE `resumes_main` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name_zh` text NOT NULL,
	`name_en` text,
	`email` text,
	`phone` text,
	`age` integer,
	`gender` text,
	`nationality` text,
	`highest_edu` text,
	`total_exp_years` text,
	`current_status` text,
	`desired_title` text,
	`desired_salary` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `resumes_main_email_unique` ON `resumes_main` (`email`);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY,
	`name` text,
	`email` text
);
--> statement-breakpoint
CREATE TABLE `comments` (
	`id` integer PRIMARY KEY NOT NULL,
	`author` text NOT NULL,
	`content` text NOT NULL
);