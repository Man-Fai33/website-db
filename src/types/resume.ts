export interface ResumeInput {
    main: {
        nameZh: string;
        nameEn?: string;
        email?: string;
        phone?: string;
        age?: number;
        gender?: string;
        nationality?: string;
        highestEdu?: string;
        totalExpYears?: string;
        currentStatus?: string;
        desiredTitle?: string;
        desiredSalary?: string;
    };
    experience?: {
        companyName: string;
        title?: string;
        startDate?: string;
        endDate?: string;
        durationMonths?: number;
        description?: string;
        techStack?: string;
    }[];
    skills?: {
        category: string;
        skillName: string;
        proficiency?: string;
    }[];
    certifications?: {
        certName: string;
        issuer?: string;
        issueDate?: string;
    }[];
}
