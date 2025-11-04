import { api } from '@/lib/api'
import { CreateUzelDto, Uzel } from '@/types/uzel'
// import { CreateXodimDto, Xodim } from '@/types/xodim'

export const uzelService = {
	async getAll(): Promise<Uzel[]> {
		const res = await api.get('/uzel')
		return res.data
	},

	async getAllBynomi(id: string): Promise<Uzel[]> {
		const res = await api.get(`/uzel/:${id}`)
		return res.data
	},

	async create(data: CreateUzelDto): Promise<CreateUzelDto> {
		const res = await api.post('/uzel', data)
		return res.data
	},

	async update(id: string, payload: CreateUzelDto) {
		const { data } = await api.patch(`/uzel/${id}`, payload)
		return data
	},

	async delete(id: string) {
		await api.delete(`/uzel/${id}`)
	},
}
