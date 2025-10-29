'use client'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { AddLokomotivForm } from './AddForm'

interface Props {
	open: boolean
	onClose: () => void
}

export default function AddLokomotivModal({ open, onClose }: Props) {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='max-w-md'>
				<DialogHeader>
					<DialogTitle>Yangi Lokomotiv qo‘shish</DialogTitle>
				</DialogHeader>
				<AddLokomotivForm onClose={onClose} />
			</DialogContent>
		</Dialog>
	)
}
