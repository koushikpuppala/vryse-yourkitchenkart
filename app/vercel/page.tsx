'use client'

import { VercelLinksTableComponent } from '@/components'
import Link from 'next/link'
import { useState } from 'react'

const HomePage = () => {
	const [links, setLinks] = useState<string[] | null>(null)
	const [message, setMessage] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	let [url, setUrl] = useState<string | null>(null)

	const onSubmit = async () => {
		setLoading(true)
		if (!url)
			return {
				links: null,
				message: 'No URL provided',
			}

		if (!url.startsWith('http')) url = 'https://' + url

		if (url.endsWith('/')) url = url.slice(0, -1)

		const links: string[] = []
		const invalidLinks: string[] = []

		try {
			const response = await fetch(url, {
				headers: {
					'Content-Type': 'text/html',
				},
			})
			const html = await response.text()

			const regex = new RegExp(/<a [^>]*href=['"]([^'"]+)['"][^>]*>/g)
			const matches = html.match(regex)

			if (!matches) return { links: null, message: 'No links found' }

			for (const match of matches) {
				let link = match.replace(/<a [^>]*href=['"]([^"]+)['"][^>]*>/g, '$1')

				if (link.startsWith('mailto:') || link.startsWith('tel:') || link.startsWith('#'))
					continue

				if (link.startsWith('/')) link = link.replace('/', '')

				if (!link.startsWith('http')) links.push(`${url}/${link}`.toLocaleLowerCase())
				else links.push(link.toLocaleLowerCase())
			}

			const filteredLinks = links.filter((link, index) => links.indexOf(link) === index)

			for (const link of filteredLinks) {
				const linkResponse = await fetch(link)
				if (linkResponse.status === 404) invalidLinks.push(link)
			}

			return {
				links: invalidLinks.length > 0 ? invalidLinks : null,
				message: invalidLinks.length > 0 ? 'Invalid links found' : 'No invalid links found',
			}
		} catch (err) {
			return {
				links: null,
				message: 'Error checking in links',
			}
		}
	}

	return (
		<div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 text-center min-h-screen'>
			<h1 className='text-2xl font-bold text-gray-900 dark:text-gray-50 sm:text-3xl'>
				Broken Links Checker (onClick event method) 🎉
			</h1>
			<p className='mt-1.5 text-sm text-gray-500'>Internship first round short assignment</p>

			<form className='mx-auto mb-0 mt-8 flex flex-col space-y-4 items-center'>
				<input
					name='url'
					className='max-w-md w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50'
					placeholder='Enter URL or Domain Name'
					onChange={(e) => setUrl(e.target.value.toLocaleLowerCase())}
				/>
				<button
					aria-disabled={loading}
					disabled={loading}
					type='submit'
					onClick={async (e) => {
						e.preventDefault()
						const { links, message } = await onSubmit()
						setLinks(links)
						setMessage(message)
						setLoading(false)
					}}
					className={`inline-block rounded-lg px-5 py-2 text-sm font-medium ${
						loading ? 'bg-blue-200 text-gray-500' : 'bg-blue-500 text-white'
					}`}>
					{loading ? 'Checking...' : 'Check'}
				</button>
				<VercelLinksTableComponent links={links} message={message} loading={loading} />
			</form>

			<p className='text-xs/relaxed text-gray-500 dark:text-gray-100 py-2'>
				Created by {}
				<Link
					href='https://koushikpuppala.com'
					target='_blank'
					className='text-gray-700 transition hover:text-gray-700/75 dark:text-gray-400 dark:hover:text-gray-400/75'>
					Koushikpuppala
				</Link>
				. Open sourced on {}
				<Link
					href='https://koushikpuppala.com/github/vryse-yourkitchenkart'
					target='_blank'
					className='text-gray-700 transition hover:text-gray-700/75 dark:text-gray-400 dark:hover:text-gray-400/75'>
					GitHub
				</Link>
				. For formActions method {}
				<Link
					href='/'
					className='text-gray-700 transition hover:text-gray-700/75 dark:text-gray-400 dark:hover:text-gray-400/75'>
					Click Here
				</Link>
			</p>
		</div>
	)
}

export default HomePage
