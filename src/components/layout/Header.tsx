'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ModeToggle } from '@/components/ui/shared/mode-toggle'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import Breadcrumbs from './Breadcrumps'

export default function Header() {
	const { user, logout } = useAuth()
	const router = useRouter()

	return (
		<div>
			<header className='h-20 bg-background border-b flex flex-col justify-center px-4 sticky top-0 z-20'>
				<div className='flex items-center justify-between mb-1'>
					<h1 className='text-lg font-semibold text-primary'>Sex Jurnallari</h1>
					<div className='flex items-center gap-4'>
						<ModeToggle />
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Avatar className='cursor-pointer'>
									{/* <AvatarImage src='/avatar.png' alt='User avatar' /> */}
									<AvatarFallback>
										{user?.role.slice(0, 2).toUpperCase()}
									</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end'>
								<DropdownMenuLabel>Profil</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={() => router.push(`/profile/?userId=${user?._id}`)}
								>
									Mening profilim
								</DropdownMenuItem>
								<DropdownMenuItem onClick={logout} className='text-red-500'>
									Chiqish
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</header>
			<div className='h-15 bg-transparent border-b  flex flex-col justify-center mx-4 sticky top-0'>
				<Breadcrumbs />
			</div>
		</div>
	)
}
