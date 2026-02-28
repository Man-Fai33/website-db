import { sqliteTable, integer, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const resumesExperience = sqliteTable("resumes_experience", {
    expId: integer("exp_id").primaryKey({ autoIncrement: true }).notNull(),
    resumeId: integer("resume_id").notNull(),
    companyName: text("company_name").notNull(),
    title: text("title"),
    startDate: text("start_date"),
    endDate: text("end_date"),
    durationMonths: integer("duration_months"),
    description: text("description"),
    techStack: text("tech_stack"),
});

export const resumesSkills = sqliteTable("resumes_skills", {
    skillId: integer("skill_id").primaryKey({ autoIncrement: true }).notNull(),
    resumeId: integer("resume_id").notNull(),
    category: text("category").notNull(),
    skillName: text("skill_name").notNull(),
    proficiency: text("proficiency"),
});

export const resumesCertifications = sqliteTable("resumes_certifications", {
    certId: integer("cert_id").primaryKey({ autoIncrement: true }).notNull(),
    resumeId: integer("resume_id").notNull(),
    certName: text("cert_name").notNull(),
    issuer: text("issuer"),
    issueDate: text("issue_date"),
});

export const resumesMain = sqliteTable("resumes_main", {
    id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
    nameZh: text("name_zh").notNull(),
    nameEn: text("name_en"),
    email: text("email"),
    phone: text("phone"),
    age: integer("age"),
    gender: text("gender"),
    nationality: text("nationality"),
    highestEdu: text("highest_edu"),
    totalExpYears: text("total_exp_years"),
    currentStatus: text("current_status"),
    desiredTitle: text("desired_title"),
    desiredSalary: text("desired_salary"),
}, (table) => ({
    emailUnique: uniqueIndex("resumes_main_email_unique").on(table.email),
}));

export const users = sqliteTable("users", {
    id: integer("id").primaryKey(),
    name: text("name"),
    email: text("email"),
});

export const comments = sqliteTable("comments", {
    id: integer("id").primaryKey().notNull(),
    author: text("author").notNull(),
    content: text("content").notNull(),
});

// Relations
export const resumesMainRelations = relations(resumesMain, ({ many }) => ({
    experience: many(resumesExperience),
    skills: many(resumesSkills),
    certifications: many(resumesCertifications),
}));

export const resumesExperienceRelations = relations(resumesExperience, ({ one }) => ({
    resume: one(resumesMain, {
        fields: [resumesExperience.resumeId],
        references: [resumesMain.id],
    }),
}));

export const resumesSkillsRelations = relations(resumesSkills, ({ one }) => ({
    resume: one(resumesMain, {
        fields: [resumesSkills.resumeId],
        references: [resumesMain.id],
    }),
}));

export const resumesCertificationsRelations = relations(resumesCertifications, ({ one }) => ({
    resume: one(resumesMain, {
        fields: [resumesCertifications.resumeId],
        references: [resumesMain.id],
    }),
}));
