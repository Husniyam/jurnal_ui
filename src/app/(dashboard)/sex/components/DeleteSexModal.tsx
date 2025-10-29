'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useDeleteSex } from '@/hooks/useSex'
import { Sex } from '@/types/sex'
import { toast } from 'sonner'

interface Props {
	open: boolean
	onClose: () => void
	selected?: Sex
}

export default function DeleteSexModal({ open, onClose, selected }: Props) {
	const { mutateAsync, isPending } = useDeleteSex()

	const handleDelete = async () => {
		try {
			if (selected) await mutateAsync(selected._id)
			toast.success('Sex o‘chirildi 🗑️')
			onClose()
		} catch {
			toast.error('O‘chirishda xatolik yuz berdi ❌')
		}
	}

	if (!selected) return null

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='text-center space-y-3'>
				<DialogHeader>
					<DialogTitle>O‘chirishni tasdiqlang</DialogTitle>
				</DialogHeader>
				<p>
					Haqiqatan ham {selected.nomi} ({selected.joylashuv}) sexini
					o‘chirmoqchimisiz?
				</p>
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
