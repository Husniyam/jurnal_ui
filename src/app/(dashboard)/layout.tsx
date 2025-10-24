'use client'

import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const router = useRouter()
	const [isClient, setIsClient] = useState(false)

	// useEffect(() => {
	// 	setIsClient(true)
	// 	const token = localStorage.getItem('token')
	// 	if (!token) router.push('/login')
	// }, [router])

	// if (!isClient) return null

	return (
		<div className='flex h-screen overflow-hidden'>
			<Sidebar />
			<div className='flex flex-col flex-1'>
				<Header />
				<main className='flex-1 overflow-y-auto bg-muted/30 p-4'>
					{children}
				</main>
			</div>
		</div>
	)
}
