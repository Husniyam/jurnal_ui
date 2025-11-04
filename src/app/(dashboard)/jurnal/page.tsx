'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useJurnallar } from '@/hooks/useJurnal'
import { Jurnal } from '@/types/jurnal'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import AddModal from './components/AddJurnalModal'
import EditJurnalModal from './components/EditJurnalModal'

// --- KOMPONENT ---
export default function JurnalPage() {
	const [filtered, setFiltered] = useState<Jurnal[]>([])
	const [search, setSearch] = useState('')
	const [editOpen, setEditOpen] = useState(false)
	const [open, setOpen] = useState(false)
	const [statusFilter, setStatusFilter] = useState('')
	const { data: jurnallar = [] } = useJurnallar()
	const [selectedJurnal, setSelectedJurnal] = useState<Jurnal>()
	console.log(jurnallar)

	// FILTER & SEARCH
	useEffect(() => {
		let result = jurnallar.filter(
			j =>
				j.lokomotiv.nomi.toLowerCase().includes(search.toLowerCase()) ||
				j.yechilganuzel.raqami.toLowerCase().includes(search.toLowerCase()) ||
				j.yechganXodim.ism.toLowerCase().includes(search.toLowerCase())
		)
		if (statusFilter) {
			result = result.filter(j => j.status === statusFilter)
		}
		setFiltered(result)
	}, [search, statusFilter, jurnallar])

	const getStatusBadge = (status: string) => {
		switch (status) {
			case 'Tamirda':
				return <Badge variant='default'>Tamirda</Badge>
			case 'Jarayonda':
				return <Badge variant='secondary'>Jarayonda</Badge>
			case 'Ish holatida':
				return <Badge variant='outline'>Yakunlangan</Badge>
			default:
				return <Badge variant='outline'>—</Badge>
		}
	}

	return (
		<div className='p-6 space-y-6'>
			{/* FILTERS */}
			<div className='flex flex-col sm:flex-row justify-between items-center gap-3'>
				<div className='flex items-center gap-3 w-full sm:w-auto'>
					<Input
						placeholder='Qidiruv (lokomotiv, xodim, uzel...)'
						value={search}
						onChange={e => setSearch(e.target.value)}
						className='max-w-xs'
					/>
					{/* <Select value={statusFilter} onValueChange={setStatusFilter}>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='Status bo‘yicha filter' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='Barchasi'>Barchasi</SelectItem>
							<SelectItem value='Tamirda'>Tamirda</SelectItem>
							<SelectItem value='Ish holatida'>Ish holatida</SelectItem>
						</SelectContent>
					</Select> */}
				</div>

				<Button
					className='flex items-center gap-2'
					onClick={() => setOpen(!open)}
				>
					<Plus className='h-4 w-4' />
					Yangi jurnal
				</Button>
			</div>

			{/* TABLE */}
			<Card className=''>
				<CardHeader>
					<CardTitle>Jurnallar ro‘yxati</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='overflow-x-auto'>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>T/r</TableHead>
									<TableHead>Lokomotiv</TableHead>
									<TableHead>Uzel turi</TableHead>
									<TableHead>Yechilgan uzel raqami</TableHead>
									<TableHead>Yechgan xodim</TableHead>
									<TableHead>Yechilgan sana</TableHead>
									<TableHead>Ta’mir turi</TableHead>
									<TableHead>Qo‘yilgan uzel raqami</TableHead>
									<TableHead>Qo‘ygan xodim</TableHead>
									<TableHead>Qo‘yilgan sana</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Amallar</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filtered ? (
									filtered.map((j, i) => (
										<TableRow key={j._id}>
											<TableCell>{i + 1}</TableCell>
											<TableCell>
												{j.lokomotiv?.nomi} {j.lokomotiv?.zavodRaqami}
											</TableCell>
											<TableCell>{j.yechilganuzel?.uzeltype.nomi}</TableCell>
											<TableCell>{j.yechilganuzel?.raqami}</TableCell>
											<TableCell>
												{j.yechganXodim?.ism} {j.yechganXodim?.familiya}
											</TableCell>
											<TableCell>
												{j.yechilganSana
													? j.yechilganSana.toLocaleString().slice(0, 10)
													: '—'}
											</TableCell>
											<TableCell>{j?.tamirTuri}</TableCell>
											<TableCell>{j.qoyilganuzel?.raqami || '—'}</TableCell>
											<TableCell>{j.qoyganXodim?.ism || '—'}</TableCell>
											<TableCell>
												{j.qoyilganSana
													? j.qoyilganSana.toLocaleString().slice(0, 10)
													: '—'}
											</TableCell>
											<TableCell>{getStatusBadge(j.status)}</TableCell>
											<TableCell>
												<Button
													className='cursor-pointer'
													onClick={() => {
														setSelectedJurnal(j)
														setEditOpen(!editOpen)
													}}
												>
													Edit
												</Button>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={7} className='text-center py-4'>
											Hech qanday natija topilmadi 😕
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>

			<AddModal open={open} onClose={() => setOpen(false)} />
			<EditJurnalModal
				open={editOpen}
				onClose={() => setEditOpen(false)}
				selectedJurnal={selectedJurnal}
			/>
		</div>
	)
}
