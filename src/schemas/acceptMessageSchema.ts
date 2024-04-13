import {z} from 'zod';

export const acceptMessageScherma = z.object({
    acceptMessages: z.boolean(),
})