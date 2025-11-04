import { z } from 'zod'

export const uzeltypeSchema = z.object({
	nomi: z.string().min(3, 'Nomi kamida 3 ta belgidan iborat bo‘lishi kerak'),
	korikmuddat: z
		.string()
		.min(1, 'muddat kamida 1 ta belgidan iborat bo‘lishi kerak'),
	description: z
		.string()
		.min(3, 'Tarifi kamida 3 ta belgidan iborat bo‘lishi kerak'),
})

export type UzeltypeSchema = z.infer<typeof uzeltypeSchema>
