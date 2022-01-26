import { useState } from 'react'
import { Product } from '../entities/Product'

export const UseCartManager = () => {
	const STORAGEKEY = 'MUSECART'
	const [cart, setCart] = useState<Product[]>([])

	const initCart = () => {
		const cart = localStorage.getItem(STORAGEKEY)
		if (cart) {
			setCart(JSON.parse(cart))
		}
	}

	const getCart = () => {
		return cart
	}

	const addToCart = (product: Product) => {
		let x = cart
		x.push(product)
		setCart(x)
		localStorage.setItem(STORAGEKEY, JSON.stringify(x))
	}

	const removeFromCart = (product: Product) => {
		const cart = getCart()
		cart.splice(cart.indexOf(product), 1)
		localStorage.setItem(STORAGEKEY, JSON.stringify(cart))
	}

	const getCartTotal = () => {
		let x = getCart()
		let total = 0
		x.forEach((product) => {
			total += product.price
		})
		return total
	}

	return {
		initCart,
		getCart,
		addToCart,
		removeFromCart,
		getCartTotal
	}
}
