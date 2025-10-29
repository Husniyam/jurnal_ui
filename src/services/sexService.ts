import { api } from '@/lib/api'
import { CreateSexDto, Sex } from '@/types/sex'
// import { CreateXodimDto, Xodim } from '@/types/xodim'

export const sexService = {
	async getAll(): Promise<Sex[]> {
		const res = await api.get('/sex')
		return res.data
	},

	async create(data: CreateSexDto): Promise<Sex> {
		const res = await api.post('/sex', data)
		return res.data
	},

	async update(id: string, payload: CreateSexDto) {
		const { data } = await api.patch(`/sex/${id}`, payload)
		return data
	},

	async delete(id: string) {
		await api.delete(`/sex/${id}`)
	},
}
