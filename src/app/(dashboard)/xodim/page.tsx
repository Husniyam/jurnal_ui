'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useXodimlar } from '@/hooks/useXodim'
import { Xodim } from '@/types/xodim'
import { UserPen, Users, UserX } from 'lucide-react'
import { useMemo, useState } from 'react'
import AddXodimModal from './components/AddXodimModal'
import DeleteXodimModal from './components/DeleteXodimModal'
import EditXodimModal from './components/EditXodimModal'

export default function XodimlarPage() {
	const [search, setSearch] = useState('')
	const [filterSex, setFilterSex] = useState('all')
	const [currentPage, setCurrentPage] = useState(1)
	const [perPage] = useState(5)
	const [open, setOpen] = useState(false)
	const { data: xodimlar = [] } = useXodimlar()
	const [editOpen, setEditOpen] = useState(false)
	const [deleteOpen, setDeleteOpen] = useState(false)
	const [selectedXodim, setSelectedXodim] = useState<Xodim>()

	// 🔍 Qidiruv va filter
	const filtered = useMemo(() => {
		return xodimlar.filter(emp => {
			const fullName = `${emp.familiya} ${emp.ism}`.toLowerCase()
			const searchLower = search.toLowerCase()
			const matchesSearch =
				fullName.includes(searchLower) || emp.jshshir.includes(searchLower)
			const matchesSex = filterSex === 'all' || emp.sex.nomi === filterSex
			return matchesSearch && matchesSex
		})
	}, [search, filterSex, xodimlar])

	// 🔢 Pagination
	const totalPages = Math.ceil(filtered.length / perPage)
	const paginated = filtered.slice(
		(currentPage - 1) * perPage,
		currentPage * perPage
	)

	const handlePageChange = (page: number) => setCurrentPage(page)

	const totalEmployees = xodimlar.length
	// const sexCounts = employees.reduce((acc: Record<string, number>, emp) => {
	// 	acc[emp.sex] = (acc[emp.sex] || 0) + 1
	// 	return acc
	// }, {})

	return (
		<div className='p-6 space-y-6'>
			<div>
				<h1 className='text-2xl font-semibold tracking-tight'>Xodimlar</h1>
			</div>

			{/* 📊 Statistik cardlar */}
			<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Jami xodimlar</CardTitle>
						<Users className='h-5 w-5 text-muted-foreground' />
					</CardHeader>
					<CardContent className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<div className='text-2xl font-bold'>{totalEmployees}</div>

						<Button onClick={() => setOpen(true)}>+ Yangi xodim</Button>
					</CardContent>
				</Card>

				{/* {Object.entries(sexCounts).map(([sex, count]) => (
					<Card key={sex}>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>{sex}</CardTitle>
							<Building2 className='h-5 w-5 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>{count}</div>
						</CardContent>
					</Card>
				))} */}
			</div>

			{/* 🔎 Qidiruv va Filter */}
			<div className='flex flex-col sm:flex-row justify-between gap-3'>
				<Input
					placeholder='Ism, familiya yoki JShShIR bo‘yicha qidiruv...'
					value={search}
					onChange={e => setSearch(e.target.value)}
					className='max-w-sm'
				/>
				<Select value={filterSex} onValueChange={setFilterSex}>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Sexni tanlang' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>Barchasi</SelectItem>
						<SelectItem value='Sex-1'>Sex-1</SelectItem>
						<SelectItem value='Sex-2'>Sex-2</SelectItem>
						<SelectItem value='Sex-3'>Sex-3</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* 📋 Jadval */}
			<div className='overflow-x-auto border rounded-lg w-full justify-center'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>T/r</TableHead>
							<TableHead>Familiya</TableHead>
							<TableHead>Ism</TableHead>
							<TableHead>Telefon</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Tabel raqami</TableHead>
							<TableHead>Sex</TableHead>
							<TableHead>JShShIR</TableHead>
							<TableHead>Amallar</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{paginated.map((emp, key) => (
							<TableRow key={emp._id}>
								<TableCell>{key + 1}</TableCell>
								<TableCell>{emp.familiya}</TableCell>
								<TableCell>{emp.ism}</TableCell>
								<TableCell>{emp.tel}</TableCell>
								<TableCell>{emp.email}</TableCell>
								<TableCell>{emp.tabelRaqam}</TableCell>
								<TableCell>{emp.sex.nomi}</TableCell>
								<TableCell>{emp.jshshir}</TableCell>
								<TableCell className='space-x-1'>
									<Button
										className='cursor-pointer'
										onClick={() => {
											setSelectedXodim(emp)
											setEditOpen(true)
										}}
									>
										<UserPen />
									</Button>
									<Button
										className='cursor-pointer'
										variant='destructive'
										onClick={() => {
											setSelectedXodim(emp)
											setDeleteOpen(true)
										}}
									>
										<UserX />
									</Button>
								</TableCell>
							</TableRow>
						))}
						{paginated.length === 0 && (
							<TableRow>
								<TableCell colSpan={7} className='text-center py-4'>
									Hech narsa topilmadi 😔
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{/* 🔢 Pagination tugmalari */}
			<div className='flex justify-center gap-2'>
				{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
					<Button
						key={page}
						variant={page === currentPage ? 'default' : 'outline'}
						onClick={() => handlePageChange(page)}
						className='w-10'
					>
						{page}
					</Button>
				))}
			</div>
			<AddXodimModal open={open} onClose={() => setOpen(false)} />
			<EditXodimModal
				open={editOpen}
				onClose={() => setEditOpen(false)}
				selectedXodim={selectedXodim}
			/>
			<DeleteXodimModal
				open={deleteOpen}
				onClose={() => setDeleteOpen(false)}
				selectedId={selectedXodim?._id}
			/>
		</div>
	)
}
