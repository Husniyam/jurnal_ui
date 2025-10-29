import { xodimService } from '@/services/xodimService'
import { CreateXodimDto } from '@/types/xodim'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useXodimlar() {
	return useQuery({
		queryKey: ['xodimlar'],
		queryFn: xodimService.getAll,
	})
}

export function useAddXodim() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: CreateXodimDto) => xodimService.create(data),
		onSuccess: () => {
			// toast.success('Xodim muvaffaqiyatli qo‘shildi ✅')
			queryClient.invalidateQueries({ queryKey: ['xodimlar'] })
		},
		// onError: () => {
		// 	toast.error('Xodim qo‘shishda xatolik ❌')
		// },
	})
}

export const useUpdateXodim = () => {
	const qc = useQueryClient()
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: CreateXodimDto }) =>
			xodimService.update(id, data),
		onSuccess: () => {
			// toast.success('Xodim muvaffaqiyatli yangilandi ✅'),
			qc.invalidateQueries({ queryKey: ['xodimlar'] })
		},
		// onError: () => {
		// 	toast.error('Xodim qo‘shishda xatolik ❌')
		// },
	})
}

export function useDeleteXodim() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: string) => xodimService.delete(id),
		onSuccess: () => {
			// toast.success('Xodim o‘chirildi 🗑️')
			queryClient.invalidateQueries({ queryKey: ['xodimlar'] })
		},
		// onError: () => {
		// 	toast.error('Xodimni o‘chirishda xatolik ❌')
		// },
	})
}
