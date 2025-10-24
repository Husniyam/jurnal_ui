'use client'

import { useAuth } from '@/lib/auth'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedRoute({
	children,
}: {
	children: React.ReactNode
}) {
	const { user, loading } = useAuth()
	const router = useRouter()
	const pathname = usePathname()

	useEffect(() => {
		// faqat AuthProvider yuklanib bo‘lgandan keyin
		if (!loading) {
			if (!user && pathname !== '/login') {
				router.replace('/login')
			} else if (user && pathname === '/login') {
				router.replace('/')
			}
		}
	}, [user, loading, pathname, router])
	if (loading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				Loading...
			</div>
		)
	}
	if (!user && pathname !== '/login') return null

	return <>{children}</>
}
