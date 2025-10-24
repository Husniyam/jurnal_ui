'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Breadcrumbs() {
	const pathname = usePathname()
	const segments = pathname.split('/').filter(Boolean)

	// if (segments.length === 0) return null

	const createLabel = (segment: string) =>
		segment.charAt(0).toUpperCase() + segment.slice(1)

	return (
		<nav className='flex items-center text-sm text-muted-foreground space-x-1'>
			<Link href='/' className='hover:text-primary'>
				Bosh sahifa
			</Link>
			{segments.map((segment, index) => {
				const href = '/' + segments.slice(0, index + 1).join('/')
				const isLast = index === segments.length - 1

				return (
					<span key={href} className='flex items-center'>
						<ChevronRight className='w-4 h-4 mx-1 text-muted-foreground' />
						{isLast ? (
							<span className='text-foreground font-medium'>
								{createLabel(segment)}
							</span>
						) : (
							<Link href={href} className='hover:text-primary'>
								{createLabel(segment)}
							</Link>
						)}
					</span>
				)
			})}
		</nav>
	)
}
