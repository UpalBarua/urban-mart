import { z } from 'zod';
export declare const productSchema: z.ZodObject<{
    name: z.ZodString;
    imageUrl: z.ZodString;
    ratingAvg: z.ZodNumber;
    reviewsCount: z.ZodNumber;
    salesCount: z.ZodNumber;
    price: z.ZodNumber;
    stock: z.ZodNumber;
    category: z.ZodEnum<["Canned", "Beverages", "Fresh Produce", "Dairy", "Bakery", "Pantry Staples", "Snacks", "Frozen Foods"]>;
    description: z.ZodString;
    discount: z.ZodDefault<z.ZodNumber>;
    isOnSale: z.ZodDefault<z.ZodBoolean>;
    isBestSeller: z.ZodDefault<z.ZodBoolean>;
    isNewProduct: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    imageUrl: string;
    ratingAvg: number;
    reviewsCount: number;
    salesCount: number;
    price: number;
    stock: number;
    category: "Canned" | "Beverages" | "Fresh Produce" | "Dairy" | "Bakery" | "Pantry Staples" | "Snacks" | "Frozen Foods";
    description: string;
    discount: number;
    isOnSale: boolean;
    isBestSeller: boolean;
    isNewProduct: boolean;
}, {
    name: string;
    imageUrl: string;
    ratingAvg: number;
    reviewsCount: number;
    salesCount: number;
    price: number;
    stock: number;
    category: "Canned" | "Beverages" | "Fresh Produce" | "Dairy" | "Bakery" | "Pantry Staples" | "Snacks" | "Frozen Foods";
    description: string;
    discount?: number | undefined;
    isOnSale?: boolean | undefined;
    isBestSeller?: boolean | undefined;
    isNewProduct?: boolean | undefined;
}>;
export type Product = z.infer<typeof productSchema>;
export declare const userSchema: z.ZodObject<{
    email: z.ZodString;
    userName: z.ZodString;
    photoURL: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    userName: string;
    photoURL: string;
}, {
    email: string;
    userName: string;
    photoURL: string;
}>;
export declare const cartItemSchema: z.ZodObject<{
    quantity: z.ZodDefault<z.ZodNumber>;
    product: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    quantity: number;
    product: string;
}, {
    product: string;
    quantity?: number | undefined;
}>;
export declare const cartSchema: z.ZodObject<{
    userId: z.ZodEffects<z.ZodString, string, string>;
    products: z.ZodArray<z.ZodObject<{
        quantity: z.ZodDefault<z.ZodNumber>;
        product: z.ZodEffects<z.ZodString, string, string>;
    }, "strip", z.ZodTypeAny, {
        quantity: number;
        product: string;
    }, {
        product: string;
        quantity?: number | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    userId: string;
    products: {
        quantity: number;
        product: string;
    }[];
}, {
    userId: string;
    products: {
        product: string;
        quantity?: number | undefined;
    }[];
}>;
export declare const reviewSchema: z.ZodObject<{
    user: z.ZodString;
    product: z.ZodString;
    rating: z.ZodNumber;
    comment: z.ZodString;
}, "strip", z.ZodTypeAny, {
    user: string;
    comment: string;
    product: string;
    rating: number;
}, {
    user: string;
    comment: string;
    product: string;
    rating: number;
}>;
