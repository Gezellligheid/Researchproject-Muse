import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { backend } from '../backend/backend'
import { productStorage } from '../backend/productStorage'
import ARButton from '../components/ARButton'
import Footer from '../components/Footer'
import HorizontalScroller from '../components/HorizontalScroller'
import NavigationBar from '../components/NavigationBar'
import PageLayout from '../components/PageLayout'
import ProductViewSimple from '../components/ProductViewSimple'
import VRButton from '../components/VRButton'
import { Product } from '../entities/Product'
import ProductNotFound from './ProductNotFound'

const ProductPage = () => {
	const [selectedProduct, setSelectedProduct] = useState<Product>({} as Product)
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)
	const [latestProducts, setLatestProducts] = useState<Product[]>([])

	const { id } = useParams<'id'>()

	useEffect(() => {
		setLoading(true)
		console.log(id)
		const pr = backend.getProductById(id as string)
		console.log(pr)
		const products = backend.getTestProducts()
		const latest = productStorage.getLatestVisited()
		setLatestProducts(latest)
		setProducts(products)
		if (pr) {
			productStorage.addToLatestVisited(pr)
			setSelectedProduct(pr)
			setLoading(false)
		}
	}, [id])

	return (
		<div>
			<PageLayout>
				<NavigationBar />
				{!loading && <ProductViewSimple toShowProduct={selectedProduct} />}
				<HorizontalScroller title="Bestsellers" products={products} />
				{latestProducts.length > 0 && (
					<HorizontalScroller title="Last visited" products={latestProducts} />
				)}
			</PageLayout>
			<Footer />
		</div>
	)
}

export default ProductPage
