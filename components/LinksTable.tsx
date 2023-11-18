'use client'

import Link from 'next/link'
import { useFormStatus } from 'react-dom'

const LinksTableComponent = ({
	links,
	message,
}: {
	links: string[] | null
	message: string | null
}) => {
	const { pending } = useFormStatus()

	if (pending) {
		return (
			<div className='border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto mt-8'>
				<div className='animate-pulse flex space-x-4'>
					<div className='flex-1 space-y-6 py-1'>
						<div className='h-2 bg-slate-700 rounded'></div>
						<div className='space-y-3'>
							<div className='grid grid-cols-3 gap-4'>
								<div className='h-2 bg-slate-700 rounded col-span-2'></div>
								<div className='h-2 bg-slate-700 rounded col-span-1'></div>
							</div>
							<div className='h-2 bg-slate-700 rounded'></div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<>
			{links ? (
				<div className='flex flex-col rounded-lg border border-gray-200 mt-8 overflow-hidden'>
					{links.map((link) => (
						<Link
							className='odd:bg-gray-50 whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-100 dark:odd:bg-gray-800'
							target='_blank'
							href={link}
							key={link}
							rel='noopener noreferrer'>
							{link}
						</Link>
					))}
				</div>
			) : (
				<div className='mt-8'>
					<p className='text-sm text-gray-500'>{message}</p>
				</div>
			)}
		</>
	)
}

export default LinksTableComponent
