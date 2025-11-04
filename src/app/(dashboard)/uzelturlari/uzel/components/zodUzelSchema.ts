import { z } from 'zod'

export const uzelSchema = z.object({
	uzeltype: z
		.string()
		.min(3, 'Uzel turi kamida 3 ta belgidan iborat bo‘lishi kerak'),
	raqami: z
		.string()
		.min(1, 'Uzel raqami kamida 1 ta belgidan iborat bo‘lishi kerak'),
	holati: z
		.string()
		.min(3, 'Uzel holati kamida 3 ta belgidan iborat bo‘lishi kerak'),
	lokomotiv: z
		.string()
		.min(3, 'Uzel lokomotiv kamida 3 ta belgidan iborat bo‘lishi kerak'),
	sex: z.string().min(3, 'Uzel sex kamida 3 ta belgidan iborat bo‘lishi kerak'),
})

export type UzelSchema = z.infer<typeof uzelSchema>
