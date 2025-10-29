'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useDeleteXodim } from '@/hooks/useXodim'
import { toast } from 'sonner'

interface Props {
	open: boolean
	onClose: () => void
	selectedId?: string
}

export default function DeleteXodimModal({ open, onClose, selectedId }: Props) {
	const { mutateAsync, isPending } = useDeleteXodim()

	const handleDelete = async () => {
		try {
			if (selectedId) await mutateAsync(selectedId)
			toast.success('Xodim o‘chirildi 🗑️')
			onClose()
		} catch {
			toast.error('O‘chirishda xatolik yuz berdi ❌')
		}
	}

	if (!selectedId) return null

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='text-center space-y-3'>
				<DialogHeader>
					<DialogTitle>O‘chirishni tasdiqlang</DialogTitle>
				</DialogHeader>
				<p>Haqiqatan ham bu xodimni o‘chirmoqchimisiz?</p>
				<div className='flex justify-center gap-3 mt-3'>
					<Button variant='outline' onClick={onClose}>
						Bekor qilish
					</Button>
					<Button
						variant='destructive'
						disabled={isPending}
						onClick={handleDelete}
					>
						{isPending ? 'O‘chirilmoqda...' : 'Ha, o‘chirilsin'}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
