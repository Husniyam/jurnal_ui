'use client'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Xodim } from '@/types/xodim'
import EditForm from './EditForm'

interface Props {
	open: boolean
	onClose: () => void
	selectedXodim?: Xodim
}

export default function EditXodimModal({
	open,
	onClose,
	selectedXodim,
}: Props) {
	if (!selectedXodim) return null

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Xodimni tahrirlash</DialogTitle>
				</DialogHeader>
				<EditForm initialData={selectedXodim} onClose={onClose} />
			</DialogContent>
		</Dialog>
	)
}
