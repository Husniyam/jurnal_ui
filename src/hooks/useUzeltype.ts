import { uzeltypeService } from '@/services/uzeltypeService'
import { UzeltypeDto } from '@/types/uzeltype'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useUzeltypelar() {
	return useQuery({
		queryKey: ['uzeltype'],
		queryFn: uzeltypeService.getAll,
	})
}

export function useAddUzeltype() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: UzeltypeDto) => uzeltypeService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['uzeltype'] })
		},
	})
}

export const useUpdateUzeltype = () => {
	const qc = useQueryClient()
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: UzeltypeDto }) =>
			uzeltypeService.update(id, data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ['uzeltype'] })
		},
	})
}

export function useDeleteUzeltype() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: string) => uzeltypeService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['uzeltype'] })
		},
	})
}
