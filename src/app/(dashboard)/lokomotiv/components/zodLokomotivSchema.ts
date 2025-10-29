import { z } from 'zod'

export const lokomotivSchema = z.object({
	nomi: z
		.string()
		.min(3, 'Lokomotiv nomi kamida 3 ta belgidan iborat bo‘lishi kerak'),
	turi: z
		.string()
		.min(3, 'Lokomotiv turi kamida 3 ta belgidan iborat bo‘lishi kerak'),
	zavodRaqami: z.string().min(1, 'Lokomotiv raqami kiritilishi kerak'),
	ishlabChiqarilganYil: z.string().optional(),
})

export type LokmotivSchema = z.infer<typeof lokomotivSchema>
