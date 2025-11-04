'use client'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { AddUzeltypeForm } from './AddForm'

interface Props {
	open: boolean
	onClose: () => void
}

export default function AddUzeltypeModal({ open, onClose }: Props) {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='max-w-md'>
				<DialogHeader>
					<DialogTitle>Yangi uzel turi qo‘shish</DialogTitle>
				</DialogHeader>
				<AddUzeltypeForm onClose={onClose} />
			</DialogContent>
		</Dialog>
	)
}
