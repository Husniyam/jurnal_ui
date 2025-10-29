'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSexlar } from '@/hooks/useSex'
import { Sex } from '@/types/sex'
import { Building2, Settings, SquarePen, Trash2, Users } from 'lucide-react'
import { useState } from 'react'
import AddSexModal from './components/AddSexModal'
import DeleteSexModal from './components/DeleteSexModal'
import EditSexModal from './components/EditSexModal'

export default function SexlarPage() {
	const { data: sexlar = [] } = useSexlar()
	const [open, setOpen] = useState(false)
	const [editOpen, setEditOpen] = useState(false)
	const [deleteOpen, setDeleteOpen] = useState(false)
	const [selectedSex, setSelectedSex] = useState<Sex>()

	return (
		<div className='p-6 space-y-6'>
			<div className='flex justify-between items-center'>
				<h1 className='text-2xl font-semibold tracking-tight'>Sexlar</h1>
				<Button className='cursor-pointer' onClick={() => setOpen(true)}>
					+ Yangi sex
				</Button>
			</div>

			{/* 📦 Sex cardlari */}
			<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
				{sexlar.map(sex => (
					<Card
						key={sex._id}
						className='transition hover:shadow-md hover:-translate-y-1 duration-200'
					>
						<CardHeader>
							<CardTitle className='flex justify-between items-center'>
								<span>{sex.nomi}</span>
								<Building2 className='w-5 h-5 text-muted-foreground' />
							</CardTitle>
							<p className='text-sm text-muted-foreground'>{sex.joylashuv}</p>
						</CardHeader>
						<CardContent className='space-y-2'>
							<div className='flex justify-between items-center'>
								<span className='text-sm text-muted-foreground flex items-center gap-1'>
									<Users className='w-4 h-4' /> Xodimlar soni:
								</span>
								<span className='font-semibold'>{sex.xodimsoni}</span>
							</div>
							<div className='flex justify-between items-center'>
								<span className='text-sm text-muted-foreground flex items-center gap-1'>
									<Settings className='w-4 h-4' /> Uzel soni:
								</span>
								<span className='font-semibold'>{sex.uzelsoni}</span>
							</div>
							<div className='flex justify-between items-center'>
								<Button
									className='cursor-pointer'
									onClick={() => {
										setSelectedSex(sex)
										setEditOpen(true)
									}}
								>
									<SquarePen />
								</Button>
								<Button
									className='cursor-pointer'
									variant='destructive'
									onClick={() => {
										setSelectedSex(sex)
										setDeleteOpen(true)
									}}
								>
									<Trash2 />
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
			<AddSexModal open={open} onClose={() => setOpen(false)} />
			<EditSexModal
				open={editOpen}
				onClose={() => setEditOpen(false)}
				selectedSex={selectedSex}
			/>
			<DeleteSexModal
				open={deleteOpen}
				onClose={() => setDeleteOpen(false)}
				selected={selectedSex}
			/>
		</div>
	)
}
