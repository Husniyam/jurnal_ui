import { lokomotivService } from '@/services/lokmotivService'
import { CreateLokomotivDto } from '@/types/lokomotiv'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useLokomotivlar() {
	return useQuery({
		queryKey: ['lokomotiv'],
		queryFn: lokomotivService.getAll,
	})
}

export function useAddLokomotiv() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: CreateLokomotivDto) => lokomotivService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['lokomotiv'] })
		},
	})
}

export const useUpdateLokomotiv = () => {
	const qc = useQueryClient()
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: CreateLokomotivDto }) =>
			lokomotivService.update(id, data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ['lokomotiv'] })
		},
	})
}

export function useDeleteLokomotiv() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: string) => lokomotivService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['lokomotiv'] })
		},
	})
}
