import { useEffect, useState } from 'react'
import { backend } from '../backend/backend'
import Footer from '../components/Footer'
import Header from '../components/Header'
import HorizontalScroller from '../components/HorizontalScroller'
import NavigationBar from '../components/NavigationBar'
import PageLayout from '../components/PageLayout'
import ProductViewSimple from '../components/ProductViewSimple'
import { Product } from '../entities/Product'

function Home() {
	const [bestSellers, setBestSellers] = useState<Array<Product>>([])

	useEffect(() => {
		const products = backend.getTestProducts()
		setBestSellers(products)
	}, [])

	return (
		<div>
			<PageLayout>
				<NavigationBar />
				<Header />
				<HorizontalScroller products={bestSellers} title="Bestsellers" />
				<HorizontalScroller products={bestSellers} title="Blaasinstrumenten" />
				{/* <ProductViewSimple /> */}
			</PageLayout>
			<Footer />
		</div>
	)
}

export default Home
