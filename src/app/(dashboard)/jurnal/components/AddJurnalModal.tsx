'use client'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { AddForm } from './AddForm'

interface Props {
	open: boolean
	onClose: () => void
}

export default function AddModal({ open, onClose }: Props) {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='max-w-md'>
				<DialogHeader>
					<DialogTitle>Yangi ish qo‘shish</DialogTitle>
				</DialogHeader>
				<AddForm onClose={onClose} />
			</DialogContent>
		</Dialog>
	)
}
