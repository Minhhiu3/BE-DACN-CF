import { z } from "zod";
import MESSAGES from "../../common/helpers/message.js";

const createProductSchema = z.object({
    name: z.string().min(1, MESSAGES.PRODUCT.PRODUCT_NAME_REQUIRED),

    thumbnail: z
        .string()
        .url(MESSAGES.PRODUCT.PRODUCT_THUMBNAIL_REQUIRED)
        .optional(),

    specification: z
        .string()
        .min(1, MESSAGES.PRODUCT.PRODUCT_SPECIFICATION_REQUIRED)
        .default("Chưa có thông số kỹ thuật"),


    price: z
        .number({
            required_error: MESSAGES.PRODUCT.PRODUCT_PRICE_REQUIRED,
            invalid_type_error: MESSAGES.PRODUCT.INVALID_PRICE
        })
        .min(0, MESSAGES.PRODUCT.INVALID_PRICE),

    oldPrice: z.number().min(0).optional(),

    description: z
        .string()
        .min(1, MESSAGES.PRODUCT.PRODUCT_DESCRIPTION_REQUIRED)
        .default("Chưa có mô tả"),


    rating: z
        .number()
        .min(0)
        .max(5)
        .default(0),

    stock: z
        .number()
        .min(0, MESSAGES.PRODUCT.PRODUCT_STOCK_REQUIRED)
        .default(0),

    soldCount: z
        .number()
        .min(0)
        .default(0),

    image: z
        .string()
        .optional(),

    slug: z
        .string()
        .min(1, MESSAGES.PRODUCT.PRODUCT_SLUG_REQUIRED)
});

export default createProductSchema;
