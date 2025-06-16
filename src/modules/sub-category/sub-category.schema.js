import { z } from "zod";
import MESSAGES from "../../common/helpers/message.js";

const createSubCategorySchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    slug: z.string().min(1, "Slug is required"),
    deletedAt: z.date().nullable().optional(),
    categoryParrentId: z.string(),
});

export default createSubCategorySchema;
