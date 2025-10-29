'use client'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Sex } from '@/types/sex'
import EditForm from './EditForm'

interface Props {
	open: boolean
	onClose: () => void
	selectedSex?: Sex
}

export default function EditSexModal({ open, onClose, selectedSex }: Props) {
	if (!selectedSex) return null

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Sexni tahrirlash</DialogTitle>
				</DialogHeader>
				<EditForm initialData={selectedSex} onClose={onClose} />
			</DialogContent>
		</Dialog>
	)
}
