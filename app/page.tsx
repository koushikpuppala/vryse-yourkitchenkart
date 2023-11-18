'use client'

import { linkChecker } from '@/actions'
import { LinksTableComponent, SubmitButtonComponent } from '@/components'
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
		<div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 text-center'>
			<h1 className='text-2xl font-bold text-gray-900 dark:text-gray-50 sm:text-3xl'>
				Broken Links Checker 🎉
			</h1>
			<p className='mt-1.5 text-sm text-gray-500'>Internship first round short assignment</p>

			<form action={formAction} className='mx-auto mb-0 mt-8 max-w-md'>
				<div className='flex flex-col space-y-4'>
					<input
						name='url'
						className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50'
						placeholder='Enter URL'
					/>
					<SubmitButtonComponent />
				</div>
				<LinksTableComponent links={state.links} message={state.message} />
			</form>
		</div>
	)
}

export default HomePage
