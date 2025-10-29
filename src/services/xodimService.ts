import { api } from '@/lib/api'
import { CreateXodimDto, Xodim } from '@/types/xodim'

export const xodimService = {
	async getAll(): Promise<Xodim[]> {
		const res = await api.get('/xodim')
		return res.data
	},

	async create(data: CreateXodimDto): Promise<Xodim> {
		const res = await api.post('/xodim', data)
		return res.data
	},

	async update(id: string, payload: CreateXodimDto) {
		const { data } = await api.patch(`/xodim/${id}`, payload)
		return data
	},

	async delete(id: string) {
		await api.delete(`/xodim/${id}`)
	},
}
