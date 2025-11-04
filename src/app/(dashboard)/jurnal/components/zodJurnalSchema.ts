import { z } from 'zod'

export const jurnalcreateSchema = z.object({
	lokomotiv: z.string().min(3, 'Lokomotiv tanlangan bo‘lishi kerak'),
	yechilganuzel: z.string().min(1, 'Yechilgan uzel tanlangan bo‘lishi kerak'),
	// ✅ Sana uchun to‘g‘ri preprocess
	yechilganSana: z.preprocess(
		val => {
			if (!val || val === '') return undefined
			const date = new Date(val as string)
			return isNaN(date.getTime()) ? undefined : date
		},
		z.date().refine(d => !!d, { message: 'Yechilgan sana tanlanishi kerak' })
	),
	yechganXodim: z.string().min(3, 'Yechgan xodim tanlangan bo‘lishi kerak'),
	tamirTuri: z.string().min(3, 'Tamir turi tanlangan bo‘lishi kerak'),
	qoyilganuzel: z.string().optional(),
	qoyganXodim: z.string().optional(),
	qoyilganSana: z.date().optional(),
	status: z.string().min(3, 'Statusi kiritilishi kerak'),
})

export type JurnalcreateSchema = z.infer<typeof jurnalcreateSchema>

export const jurnalupdateSchema = z.object({
	lokomotiv: z.string().min(3, 'Lokomotiv tanlangan bo‘lishi kerak'),
	yechilganuzel: z.string().min(1, 'Yechilgan uzel tanlangan bo‘lishi kerak'),
	// ✅ Sana uchun to‘g‘ri preprocess
	yechilganSana: z.coerce.date(),
	yechganXodim: z.string().min(3, 'Yechgan xodim tanlangan bo‘lishi kerak'),
	tamirTuri: z.string().min(3, 'Tamir turi tanlangan bo‘lishi kerak'),
	qoyilganuzel: z.string().min(1, 'Qoyilgan uzel tanlangan bo‘lishi kerak'),
	qoyganXodim: z.string().min(3, 'Qoygan xodim tanlangan bo‘lishi kerak'),
	qoyilganSana: z.preprocess(
		val => {
			if (!val || val === '') return undefined
			const date = new Date(val as string)
			return isNaN(date.getTime()) ? undefined : date
		},
		z.date().refine(d => !!d, { message: 'Qoyilgan sana tanlanishi kerak' })
	),
	status: z.string().min(3, 'Statusi kiritilishi kerak'),
})

export type JurnalupdateSchema = z.infer<typeof jurnalupdateSchema>
