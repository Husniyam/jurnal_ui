'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useUzeltypelar } from '@/hooks/useUzeltype'
import { Uzeltypewith } from '@/types/uzeltype'
import { Search, SquarePen, Trash2, Wrench } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import AddUzeltypeModal from './components/AddUzeltypeModal'
import DeleteUzeltypeModal from './components/DeleteUzeltypeModal'
import EditUzeltypeModal from './components/EditUzeltypeModal'

export default function UzellarPage() {
	const router = useRouter()
	const [search, setSearch] = useState('')
	const { data: uzeltypelar = [] } = useUzeltypelar()
	const [open, setOpen] = useState(false)
	const [editOpen, setEditOpen] = useState(false)
	const [deleteOpen, setDeleteOpen] = useState(false)
	const [selectedUzeltype, setSelectedUzeltype] = useState<Uzeltypewith>()

	// 🔹 Qidiruv bo‘yicha filtr
	const filtered = useMemo(() => {
		if (!search.trim()) return uzeltypelar
		return uzeltypelar.filter(item =>
			item.nomi.toLowerCase().includes(search.toLowerCase())
		)
	}, [uzeltypelar, search])

	return (
		<div className='p-6 space-y-6'>
			<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
				<h1 className='text-2xl font-semibold tracking-tight'>Uzel turlari</h1>
				<div className='flex space-x-1'>
					<div className='relative w-full sm:w-64'>
						<Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
						<Input
							placeholder='Uzel turi bo‘yicha qidirish...'
							value={search}
							onChange={e => setSearch(e.target.value)}
							className='pl-8'
						/>
					</div>
					<Button className='cursor-pointer' onClick={() => setOpen(true)}>
						+ Yangi uzel turi
					</Button>
				</div>
			</div>

			<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
				{filtered.length > 0 ? (
					filtered.map(item => (
						<Card
							key={item._id}
							className=' transition hover:shadow-md hover:-translate-y-1 duration-200'
						>
							<CardHeader>
								<CardTitle className='flex justify-between items-center'>
									<span>{item.nomi}</span>
									<div className='cursor-pointer bg-accent-foreground p-1 rounded-sm'>
										<Wrench
											className='w-5 h-5 text-muted-foreground'
											onClick={() => router.push(`/uzelturlari/uzel`)}
										/>
									</div>
								</CardTitle>
								<p className='text-sm text-muted-foreground'>
									{item.description}
								</p>
							</CardHeader>

							<CardContent className='space-y-3'>
								<p className='text-sm text-muted-foreground'>
									Ta’mir davri: <b>{item.korikmuddat} oy</b>
								</p>

								<div className='flex justify-between items-center'>
									<span className='text-sm'>Umumiy uzellar:</span>
									<span className='font-semibold'>{item.uzellarsoni}</span>
								</div>

								<div className='flex justify-between gap-2'>
									<span>
										{' '}
										Yaxshi-
										<Badge className='bg-blue-500 text-white hover:bg-blue-600'>
											{item.tamiriyaxshi} ta
										</Badge>
									</span>
									<span>
										Orta-
										<Badge className='bg-yellow-400 text-black hover:bg-yellow-500'>
											{item.tamirgaozqoldisoni} ta
										</Badge>
									</span>
									<span>
										Otgan-
										<Badge className='bg-red-500 text-white hover:bg-red-600'>
											{item.tamirdavriotgansoni} ta
										</Badge>
									</span>
								</div>
								<div className='flex justify-between items-center'>
									<Button
										className='cursor-pointer'
										onClick={() => {
											setSelectedUzeltype(item)
											setEditOpen(true)
										}}
									>
										<SquarePen />
									</Button>
									<Button
										className='cursor-pointer'
										variant='destructive'
										onClick={() => {
											setSelectedUzeltype(item)
											setDeleteOpen(true)
										}}
									>
										<Trash2 />
									</Button>
								</div>
							</CardContent>
						</Card>
					))
				) : (
					<p className='text-center text-muted-foreground col-span-full'>
						Hech qanday natija topilmadi 😕
					</p>
				)}
			</div>
			<AddUzeltypeModal open={open} onClose={() => setOpen(false)} />
			<EditUzeltypeModal
				open={editOpen}
				onClose={() => setEditOpen(false)}
				selectedUzeltype={selectedUzeltype}
			/>
			<DeleteUzeltypeModal
				open={deleteOpen}
				onClose={() => setDeleteOpen(false)}
				selected={selectedUzeltype}
			/>
		</div>
	)
}
