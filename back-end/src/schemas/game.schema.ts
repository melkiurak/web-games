import z from "zod";

export const gameSchema = z.object({
    postName: z.string().optional(),
    take: z.coerce.number().min(5).max(100).default(10),
    lastId: z.coerce.number().optional(),
    trending: z.coerce.boolean().optional().default(false),
    mostPopular: z.coerce.boolean().optional().default(false),
    upcoming: z.coerce.boolean().optional().default(false),
    gameMoth: z.coerce.boolean().optional().default(false),
    genres: z.union([z.string(), z.array(z.string())]).optional(),
    platforms: z.union([z.string(), z.array(z.string())]).optional(),
    publishers: z.union([z.string(), z.array(z.string())]).optional(),
    categories: z.union([z.string(), z.array(z.string())]).optional(),
    metaScore: z.union([z.string(), z.number(), z.array(z.any())]).optional(),
    date: z.string().optional(),
    free: z.string().optional(),
    online: z.string().optional(),
})
export type GameQuery  = z.infer<typeof gameSchema>