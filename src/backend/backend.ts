import { Product } from '../entities/Product'

export const backend = (() => {
	const getTestProducts = () => {
		return [
			{
				id: '1',
				name: 'Product 1',
				price: 100.0,
				description:
					'Lorem ispum dolor sit amet consectetur adipisicing elit. Quisquam, quos. ',
				imageUrl:
					'https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=650&q=80',
				isAvailable: true,
				category: '6',
				extraImages: [
					// List of 4 random images
					'https://images.unsplash.com/photo-1558098329-a11cff621064?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2490&q=80',
					'https://images.unsplash.com/photo-1605020420620-20c943cc4669?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
					'https://via.placeholder.com/150',
					'https://via.placeholder.com/150'
				],
				rating: 4,
				modelUrl: '/models/acoustic_guitar/scene.gltf'
			},
			{
				id: '2',
				name: 'Product 2',
				price: 200,
				description: 'Product 2 description',
				imageUrl: 'https://via.placeholder.com/150',
				isAvailable: true,
				category: '2',
				extraImages: [
					'https://via.placeholder.com/150',
					'https://via.placeholder.com/150',
					'https://via.placeholder.com/150'
				],
				rating: 3
			},
			{
				id: '3',
				name: 'Product 3',
				price: 300,
				description: 'Product 3 description',

				imageUrl: 'https://via.placeholder.com/150',
				isAvailable: true,
				category: '3',
				extraImages: [
					'https://via.placeholder.com/150',
					'https://via.placeholder.com/150',
					'https://via.placeholder.com/150'
				],
				rating: 2
			},
			{
				id: '4',
				name: 'Product 4',
				price: 400,
				description: 'Product 4 description',
				imageUrl: 'https://via.placeholder.com/150',
				isAvailable: true,
				category: '4',
				extraImages: [
					'https://via.placeholder.com/150',
					'https://via.placeholder.com/150',
					'https://via.placeholder.com/150'
				],
				rating: 1
			},
			{
				id: '5',
				name: 'Product 5',
				price: 500,
				description: 'Product 5 description',
				imageUrl: 'https://via.placeholder.com/150',
				isAvailable: true,
				category: '5',
				extraImages: [
					'https://via.placeholder.com/150',
					'https://via.placeholder.com/150',
					'https://via.placeholder.com/150'
				],
				rating: 5
			},
			{
				id: '6',
				name: 'Product 6',
				price: 600,
				description: 'Product 6 description',
				imageUrl: 'https://via.placeholder.com/150',
				isAvailable: true,
				category: '6',
				extraImages: [
					'https://via.placeholder.com/150',
					'https://via.placeholder.com/150',
					'https://via.placeholder.com/150'
				],
				rating: 4
			}
		]
	}

	const getCategories = () => {
		return [
			{
				id: '1',
				name: 'Strings'
			},
			{
				id: '2',
				name: 'Woodwind'
			},
			{
				id: '3',
				name: 'Brass'
			},
			{
				id: '4',
				name: 'Percussion'
			},
			{
				id: '5',
				name: 'Keyboard'
			},
			{
				id: '6',
				name: 'Guitars'
			}
		]
	}

	const getSixRandomProducts = () => {
		// Get random products
		const products = getTestProducts()
		const randomProducts: Product[] = []
		for (let i = 0; i < 6; i++) {
			const randomIndex = Math.floor(Math.random() * products.length)
			// Check if product is already in the array
			if (!randomProducts.includes(products[randomIndex])) {
				randomProducts.push(products[randomIndex])
			}
		}
		return randomProducts
	}
	const getProductById = (id: string) => {
		return getTestProducts().find((product) => product.id === id)
	}
	const getRandomCategory = () => {
		const categories = getCategories()
		const randomIndex = Math.floor(Math.random() * categories.length)
		return categories[randomIndex]
	}

	const getProductsForCategory = (categoryId: string) => {
		return getTestProducts().filter(
			(product) => product.category === categoryId
		)
	}

	return {
		getSixRandomProducts,
		getTestProducts,
		getProductById,
		getCategories,
		getRandomCategory,
		getProductsForCategory
	}
})()
