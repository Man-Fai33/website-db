import { sqliteTable, AnySQLiteColumn, integer, text, uniqueIndex, numeric } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const resumesExperience = sqliteTable("resumes_experience", {
	expId: integer("exp_id").primaryKey({ autoIncrement: true }).notNull(),
	resumeId: integer("resume_id").notNull(),
	companyName: text("company_name").notNull(),
	title: text(),
	startDate: text("start_date"),
	endDate: text("end_date"),
	durationMonths: integer("duration_months"),
	description: text(),
	techStack: text("tech_stack"),
});

export const resumesSkills = sqliteTable("resumes_skills", {
	skillId: integer("skill_id").primaryKey({ autoIncrement: true }).notNull(),
	resumeId: integer("resume_id").notNull(),
	category: text().notNull(),
	skillName: text("skill_name").notNull(),
	proficiency: text(),
});

export const resumesCertifications = sqliteTable("resumes_certifications", {
	certId: integer("cert_id").primaryKey({ autoIncrement: true }).notNull(),
	resumeId: integer("resume_id").notNull(),
	certName: text("cert_name").notNull(),
	issuer: text(),
	issueDate: text("issue_date"),
});

export const resumesMain = sqliteTable("resumes_main", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	nameZh: text("name_zh").notNull(),
	nameEn: text("name_en"),
	email: text(),
	phone: text(),
	age: integer(),
	gender: text(),
	nationality: text(),
	highestEdu: text("highest_edu"),
	totalExpYears: text("total_exp_years"),
	currentStatus: text("current_status"),
	desiredTitle: text("desired_title"),
	desiredSalary: text("desired_salary"),
},
(table) => [
	uniqueIndex("resumes_main_email_unique").on(table.email),
]);

export const users = sqliteTable("users", {
	id: integer().primaryKey(),
	name: text(),
	email: text(),
});

export const d1Migrations = sqliteTable("d1_migrations", {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text(),
	appliedAt: numeric("applied_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

export const comments = sqliteTable("comments", {
	id: integer().primaryKey().notNull(),
	author: text().notNull(),
	content: text().notNull(),
});

