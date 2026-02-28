import { DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "../db/schema";
import { ResumeInput } from "../types/resume";

export async function saveResume(db: DrizzleD1Database<typeof schema>, input: ResumeInput) {
    return await db.transaction(async (tx) => {
        // 1. Insert Main Resume
        const [resume] = await tx.insert(schema.resumesMain).values(input.main).returning({ id: schema.resumesMain.id });
        const resumeId = resume.id;

        // 2. Insert Experience
        if (input.experience && input.experience.length > 0) {
            const experienceData = input.experience.map((exp) => ({
                ...exp,
                resumeId,
            }));
            await tx.insert(schema.resumesExperience).values(experienceData);
        }

        // 3. Insert Skills
        if (input.skills && input.skills.length > 0) {
            const skillsData = input.skills.map((skill) => ({
                ...skill,
                resumeId,
            }));
            await tx.insert(schema.resumesSkills).values(skillsData);
        }

        // 4. Insert Certifications
        if (input.certifications && input.certifications.length > 0) {
            const certsData = input.certifications.map((cert) => ({
                ...cert,
                resumeId,
            }));
            await tx.insert(schema.resumesCertifications).values(certsData);
        }

        return { success: true, resumeId };
    });
}
