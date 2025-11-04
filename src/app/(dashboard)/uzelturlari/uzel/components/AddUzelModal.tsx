'use client'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { AddUzelForm } from './AddForm'

interface Props {
	open: boolean
	onClose: () => void
}

export default function AddUzelModal({ open, onClose }: Props) {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='max-w-md'>
				<DialogHeader>
					<DialogTitle>Yangi uzel qo‘shish</DialogTitle>
				</DialogHeader>
				<AddUzelForm onClose={onClose} />
			</DialogContent>
		</Dialog>
	)
}
