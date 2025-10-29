import { z } from 'zod'

export const xodimSchema = z.object({
	ism: z.string().min(3, 'Ism kamida 3 ta belgidan iborat bo‘lishi kerak'),
	familiya: z
		.string()
		.min(3, 'Familiya kamida 3 ta belgidan iborat bo‘lishi kerak'),
	tel: z
		.string()
		.regex(
			/^\+998 \d{2} \d{3} \d{2} \d{2}$/,
			'Telefon raqami formati noto‘g‘ri'
		),
	tabelRaqam: z.string().min(1, 'Tabel raqami kiritilishi kerak'),
	sex: z.string().min(1, 'Sex tanlanishi kerak'),
	jshshir: z
		.string()
		.regex(/^\d{14}$/, 'JSHSHIR 14 ta raqamdan iborat bo‘lishi kerak'),
	email: z.string().email('Email noto‘g‘ri').optional(),
})

export type XodimSchema = z.infer<typeof xodimSchema>
