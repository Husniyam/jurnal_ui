'use client'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Lokomotiv } from '@/types/lokomotiv'
import EditForm from './EditForm'

interface Props {
	open: boolean
	onClose: () => void
	selectedLokomotiv?: Lokomotiv
}

export default function EditLokomotivModal({
	open,
	onClose,
	selectedLokomotiv,
}: Props) {
	if (!selectedLokomotiv) return null

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Xodimni tahrirlash</DialogTitle>
				</DialogHeader>
				<EditForm initialData={selectedLokomotiv} onClose={onClose} />
			</DialogContent>
		</Dialog>
	)
}
