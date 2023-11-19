'use client'

import { linkChecker } from '@/actions'
import { LinksTableComponent, SubmitButtonComponent } from '@/components'
import Link from 'next/link'
import { useFormState } from 'react-dom'

const initialState: {
	links: string[] | null
	message: string | null
} = {
	links: null,
	message: null,
}

const HomePage = () => {
	const [state, formAction] = useFormState(linkChecker, initialState)

	return (
		<div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 text-center min-h-screen'>
			<h1 className='text-2xl font-bold text-gray-900 dark:text-gray-50 sm:text-3xl'>
				Broken Links Checker 🎉
			</h1>
			<p className='mt-1.5 text-sm text-gray-500'>Internship first round short assignment</p>

			<form
				action={formAction}
				className='mx-auto mb-0 mt-8 flex flex-col space-y-4 items-center'>
				<input
					name='url'
					className='max-w-md w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50'
					placeholder='Enter URL or Domain Name'
				/>
				<SubmitButtonComponent />
				<LinksTableComponent links={state.links} message={state.message} />
			</form>

			<p className='text-xs/relaxed text-gray-500 dark:text-gray-100 py-2'>
				Created by {}
				<Link
					href='https://koushikpuppala.com'
					className='text-gray-700 transition hover:text-gray-700/75 dark:text-gray-400 dark:hover:text-gray-400/75'>
					Koushikpuppala
				</Link>
				.
			</p>
		</div>
	)
}

export default HomePage
