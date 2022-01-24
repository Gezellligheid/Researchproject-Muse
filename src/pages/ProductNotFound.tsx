import React from 'react'
import Footer from '../components/Footer'
import NavigationBar from '../components/NavigationBar'
import PageLayout from '../components/PageLayout'

const ProductNotFound = () => {
	return (
		<div>
			<PageLayout className="min-h-screen">
				<NavigationBar />
				<div className="flex justify-center h-full items-center">
					<h1 className="text-5xl font-bold text-slate-800">
						Product not found
					</h1>
				</div>
			</PageLayout>
		</div>
	)
}

export default ProductNotFound
