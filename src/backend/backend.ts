import { Product } from '../entities/Product'

export const backend = (() => {
	const getTestProducts = () => {
		return [
			{
				id: '2',
				name: "Squidward's Clarinet",
				price: 200,
				description:
					"The perfect woodwind instrument that can't be missed in an orchestra. With his beautiful sound, he's a great instrument for a beginner.",
				imageUrl:
					'https://images.unsplash.com/photo-1600771488491-c22d42a9347d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
				isAvailable: true,
				category: '2',
				extraImages: [
					'https://images.unsplash.com/photo-1569791832138-fbdd9a500384?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
					'https://images.unsplash.com/photo-1573871665247-2b556aa23460?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
				],
				rating: 3,
				modelUrl: '/models/clarinet/scene.gltf',
				scale: 0.008,
				offset: {
					x: 0.4,
					y: 2,
					z: -9
				},
				spawnOffset: {
					x: 0.4,
					y: -10,
					z: -10
				},
				rotationOffset: {
					x: 0,
					y: 0,
					z: 0
				}
			},
			{
				id: '3',
				name: 'Saxophone',
				price: 300,
				description:
					'A saxophone is a brass instrument that is played by blowing into a mouthpiece. It is a member of the brass family of musical instruments. The sound of a saxophone is very similar to that of a flute. So if you are looking for a saxophone, you will find it here.',

				imageUrl:
					'https://images.unsplash.com/photo-1623123776919-e5208e9b0b47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1214&q=80',
				isAvailable: true,
				category: '3',
				extraImages: [
					'https://images.unsplash.com/photo-1629907451365-6731862a0d32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
					'https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=741&q=80'
				],
				rating: 2,
				modelUrl: '/models/saxophone/scene.gltf',
				scale: 0.002,
				offset: {
					x: -0.25,
					y: 0,
					z: -0.25
				},
				spawnOffset: {
					x: 0,
					y: 100,
					z: -100
				},
				rotationOffset: {
					x: -1.57,
					y: 0,
					z: 0
				}
			},
			{
				id: '5',
				name: 'Keyboard',
				price: 500,
				description:
					'A keyboard is a musical instrument that is played by pressing a key on a keyboard. ',
				imageUrl:
					'https://images.unsplash.com/photo-1642801454292-bcd065313423?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
				isAvailable: true,
				category: '5',
				extraImages: [
					'https://images.unsplash.com/photo-1624954523716-0e89e1d71f5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1466&q=80',
					'https://images.unsplash.com/photo-1576269077433-e6814f9c4ec0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
				],
				rating: 5,
				modelUrl: '/models/keyboard/scene.gltf',
				scale: 0.2,
				offset: {
					x: 0,
					y: 0.15,
					z: 0
				},
				spawnOffset: {
					x: -0.25,
					y: 0,
					z: -0.25
				},
				rotationOffset: {
					x: 1.5708,
					y: -3.14159,
					z: 0
				}
			},

			{
				id: '6',
				name: 'Acoustic Guitar',
				price: 100.0,
				description:
					'A beautifull guiter, perfect for starters with a nice touch of sound.',
				imageUrl:
					'https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=650&q=80',
				isAvailable: true,
				category: '6',
				extraImages: [
					// List of 4 random images
					'https://images.unsplash.com/photo-1558098329-a11cff621064?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2490&q=80',
					'https://images.unsplash.com/photo-1605020420620-20c943cc4669?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
				],
				rating: 4,
				modelUrl: '/models/acoustic_guitar/scene.gltf',
				scale: 0.25,
				offset: {
					x: 0,
					y: 0.25,
					z: 0
				},
				spawnOffset: {
					x: 0,
					y: 0,
					z: -1
				},
				rotationOffset: {
					x: 0,
					y: 0,
					z: 0
				}
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
