'use server'

export const linkChecker = async (prevState: any, formData: FormData) => {
	let url = formData.get('url')?.toString().toLocaleLowerCase()
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
