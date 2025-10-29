import { api } from '@/lib/api'
import { Uzeltype, UzeltypeDto, Uzeltypewith } from '@/types/uzeltype'
// import { CreateXodimDto, Xodim } from '@/types/xodim'

export const uzeltypeService = {
	async getAll(): Promise<Uzeltypewith[]> {
		const res = await api.get('/uzeltype/with')
		return res.data
	},

	async create(data: UzeltypeDto): Promise<Uzeltype> {
		const res = await api.post('/uzeltype', data)
		return res.data
	},

	async update(id: string, payload: UzeltypeDto) {
		const { data } = await api.patch(`/uzeltype/${id}`, payload)
		return data
	},

	async delete(id: string) {
		await api.delete(`/uzeltype/${id}`)
	},
}
