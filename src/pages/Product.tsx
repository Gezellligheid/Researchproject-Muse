import React from 'react'
import { useParams } from 'react-router-dom'
import { backend } from '../backend/backend'
import ARButton from '../components/ARButton'
import Footer from '../components/Footer'
import HorizontalScroller from '../components/HorizontalScroller'
import NavigationBar from '../components/NavigationBar'
import PageLayout from '../components/PageLayout'
import ProductViewSimple from '../components/ProductViewSimple'
import VRButton from '../components/VRButton'
import ProductNotFound from './ProductNotFound'

const Product = () => {
	const { id } = useParams<'id'>()
	console.log(id)
	const product = backend.getProductById(id as string)
	const products = backend.getTestProducts()
	if (!product) {
		return (
			<>
				<ProductNotFound />
			</>
		)
	}

	return (
		<div>
			<PageLayout>
				<NavigationBar />
				<ProductViewSimple product={product} />
				<HorizontalScroller title="Bestsellers" products={products} />
				<HorizontalScroller title="Recent bezocht" products={products} />
			</PageLayout>
			<Footer />
		</div>
	)
}

export default Product
