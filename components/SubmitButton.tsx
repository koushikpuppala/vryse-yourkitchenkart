'use client'

import { useFormStatus } from 'react-dom'

const SubmitButtonComponent = () => {
	const { pending } = useFormStatus()

	return (
		<button
			aria-disabled={pending}
			disabled={pending}
			type='submit'
			className={`inline-block rounded-lg px-5 py-3 text-sm font-medium ${
				pending ? 'bg-blue-200 text-gray-500' : 'bg-blue-500 text-white'
			}`}>
			{pending ? 'Checking...' : 'Check'}
		</button>
	)
}

export default SubmitButtonComponent
