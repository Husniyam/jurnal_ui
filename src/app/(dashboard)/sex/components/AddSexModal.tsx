'use client'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { AddSexForm } from './AddForm'

interface Props {
	open: boolean
	onClose: () => void
}

export default function AddSexModal({ open, onClose }: Props) {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='max-w-md'>
				<DialogHeader>
					<DialogTitle>Yangi sex qo‘shish</DialogTitle>
				</DialogHeader>
				<AddSexForm onClose={onClose} />
			</DialogContent>
		</Dialog>
	)
}
