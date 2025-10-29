'use client'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { AddXodimForm } from './AddForm'

interface Props {
	open: boolean
	onClose: () => void
}

export default function AddXodimModal({ open, onClose }: Props) {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='max-w-md'>
				<DialogHeader>
					<DialogTitle>Yangi xodim qo‘shish</DialogTitle>
				</DialogHeader>
				<AddXodimForm onClose={onClose} />
			</DialogContent>
		</Dialog>
	)
}
