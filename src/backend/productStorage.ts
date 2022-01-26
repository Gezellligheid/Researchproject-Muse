import { Product } from '../entities/Product'

export const productStorage = (() => {
	const STORAGE_KEY = 'MUSEPRODUCTS'
	const addToLatestVisited = (product: Product) => {
		const latestVisited: Product[] = JSON.parse(
			localStorage.getItem(STORAGE_KEY) || '[]'
		)
		if (!latestVisited.find((p) => p.id === product.id)) {
			latestVisited.push(product)
		} else {
			// Remove the product from the array and move it to the front
			const index = latestVisited.findIndex((p) => p.id === product.id)
			latestVisited.splice(index, 1)
			latestVisited.push(product)
		}

		if (latestVisited.length > 10) {
			latestVisited.shift()
		}
		localStorage.setItem(STORAGE_KEY, JSON.stringify(latestVisited))
	}

	const getLatestVisited = (): Product[] => {
		return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').reverse()
	}

	return {
		addToLatestVisited,
		getLatestVisited
	}
})()
