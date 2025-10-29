import { z } from 'zod'

export const sexSchema = z.object({
	nomi: z.string().min(3, 'Nomi kamida 3 ta belgidan iborat bo‘lishi kerak'),
	joylashuv: z
		.string()
		.min(3, 'Tarifi kamida 3 ta belgidan iborat bo‘lishi kerak'),
})

export type SexSchema = z.infer<typeof sexSchema>
