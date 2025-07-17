import { z } from "zod";
import MESSAGES from "../../common/helpers/message.js";

const createProductSchema = z.object({
  title: z.string().min(1, MESSAGES.PRODUCT.PRODUCT_TITLE_REQUIRED),

  thumbnail: z
    .string()
    .url(MESSAGES.PRODUCT.PRODUCT_THUMBNAIL_REQUIRED),

  description: z
    .string()
    .min(1, MESSAGES.PRODUCT.PRODUCT_DESCRIPTION_REQUIRED),

  shortDescription: z.string().optional(),

  specifications: z.object({}).optional(), // Bạn có thể định nghĩa cụ thể object này nếu cần

  priceDefault: z
    .number({
      required_error: MESSAGES.PRODUCT.PRODUCT_PRICE_REQUIRED,
      invalid_type_error: MESSAGES.PRODUCT.INVALID_PRICE,
    })
    .min(0, MESSAGES.PRODUCT.INVALID_PRICE),

  slug: z
    .string()
    .min(1, MESSAGES.PRODUCT.PRODUCT_SLUG_REQUIRED),

  brand: z.string().min(1, MESSAGES.PRODUCT.PRODUCT_BRAND_REQUIRED), // Mongo ObjectId dạng string

  subCategory: z.string().min(1, MESSAGES.PRODUCT.PRODUCT_SUBCATEGORY_REQUIRED),

  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  tags: z.array(z.string()).optional(),

  variants: z.array(
    z.object({
      size: z.enum(["S", "M", "L", "XL", "XXL"]),
      color: z.enum(["Red", "Blue", "Green", "Black", "White", "Orange"]),
      price: z.number().min(0),
      stock: z.number().min(0),
      sku: z.string().min(1),
      images: z.array(z.string().url()).optional(),
    })
  ).min(1, MESSAGES.PRODUCT.PRODUCT_VARIANTS_REQUIRED)
});

export default createProductSchema;
