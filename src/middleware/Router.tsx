import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Product from '../pages/Product'

function Router() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/product/:id" element={<Product />} />
		</Routes>
	)
}

export default Router
