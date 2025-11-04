'use client'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Uzeltypewith } from '@/types/uzeltype'
import EditForm from './EditForm'

interface Props {
	open: boolean
	onClose: () => void
	selectedUzeltype?: Uzeltypewith
}

export default function EditUzeltypeModal({
	open,
	onClose,
	selectedUzeltype,
}: Props) {
	if (!selectedUzeltype) return null

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Uzel turini tahrirlash</DialogTitle>
				</DialogHeader>
				<EditForm initialData={selectedUzeltype} onClose={onClose} />
			</DialogContent>
		</Dialog>
	)
}
