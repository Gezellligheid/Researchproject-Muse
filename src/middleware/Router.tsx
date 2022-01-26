import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Cart from '../pages/Cart'
import Home from '../pages/Home'
import ProductPage from '../pages/ProductPage'

import Products from '../pages/Products'

function Router() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/product/:id" element={<ProductPage />} />
			<Route path="/products" element={<Products />} />
			<Route path="/cart" element={<Cart />} />
		</Routes>
	)
}

export default Router
