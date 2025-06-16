import { z } from "zod";

const brandSchema = z.object({
    title: z.string().min(1, "title is required"),
    description: z.string().optional(),
    logoUrl: z.string().optional(),
    slug: z.string().min(1, "slug is required"),
    deletedAt: z.date().nullable().optional(),
});

export default brandSchema;