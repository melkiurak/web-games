import z from "zod";

export const gameSchema = z.object({
    take: z.coerce.number().min(5).max(100).default(10),
    lastId: z.coerce.number().optional(),
    trending: z.coerce.boolean().optional().default(false),
    mostPopular: z.coerce.boolean().optional().default(false),
    upcoming: z.coerce.boolean().optional().default(false),
    gameMoth: z.coerce.boolean().optional().default(false),
})
export type GameQuery  = z.infer<typeof gameSchema>