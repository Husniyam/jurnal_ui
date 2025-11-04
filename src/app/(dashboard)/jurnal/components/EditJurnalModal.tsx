'use client'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Jurnal } from '@/types/jurnal'
import EditForm from './EditForm'

interface Props {
	open: boolean
	onClose: () => void
	selectedJurnal?: Jurnal
}

export default function EditJurnalModal({
	open,
	onClose,
	selectedJurnal,
}: Props) {
	console.log(selectedJurnal)

	if (!selectedJurnal) return null

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Jurnalni tahrirlash</DialogTitle>
				</DialogHeader>
				<EditForm initialData={selectedJurnal} onClose={onClose} />
			</DialogContent>
		</Dialog>
	)
}
