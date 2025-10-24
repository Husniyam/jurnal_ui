'use client'

import clsx from 'clsx'
import {
	BookText,
	Factory,
	LayoutDashboard,
	Menu,
	TrainFront,
	Users,
	Wrench,
	X,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const menu = [
	{ href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
	{ href: '/sex', icon: Factory, label: 'Sexlar' },
	{ href: '/jurnal', icon: BookText, label: 'Jurnallar' },
	{ href: '/uzel', icon: Wrench, label: 'Uzel-agregatlar' },
	{ href: '/lokomotiv', icon: TrainFront, label: 'Lokomotivlar' },
	{ href: '/xodim', icon: Users, label: 'Xodimlar' },
]

export default function Sidebar() {
	const [open, setOpen] = useState(false)
	const pathname = usePathname()

	return (
		<>
			{/* Mobil menyu tugmasi */}
			<button
				className='md:hidden fixed top-4 left-4 z-30 bg-primary text-white p-2 rounded-lg'
				onClick={() => setOpen(!open)}
			>
				{open ? <X /> : <Menu />}
			</button>

			{/* Sidebar */}
			<aside
				className={clsx(
					'fixed md:static top-0 left-0 z-20 w-64 h-full bg-card border-r flex flex-col p-4 transition-transform',
					open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
				)}
			>
				<h2 className='text-xl font-bold mb-6 text-primary text-center'>
					Startup 3.0
				</h2>
				<nav className='flex flex-col space-y-2'>
					{menu.map(item => {
						const Icon = item.icon
						const active = pathname.startsWith(item.href)

						return (
							<Link
								key={item.href}
								href={item.href}
								className={clsx(
									'flex items-center gap-3 p-2 rounded-lg transition-colors',
									active
										? 'bg-primary text-white'
										: 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
								)}
								onClick={() => setOpen(false)}
							>
								<Icon className='w-5 h-5' />
								{item.label}
							</Link>
						)
					})}
				</nav>
			</aside>
		</>
	)
}
