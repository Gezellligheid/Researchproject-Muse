import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { backend } from '../backend/backend'
import { productStorage } from '../backend/productStorage'
import Footer from '../components/Footer'
import HorizontalScroller from '../components/HorizontalScroller'
import NavigationBar from '../components/NavigationBar'
import PageLayout from '../components/PageLayout'
import StarRating from '../components/StarRating'
import { Category } from '../entities/Category'
import { Product } from '../entities/Product'

const Products = () => {
	const [products, setProducts] = useState<Product[]>([])
	const [categories, setCategories] = useState<Category[]>([])
	const [selectedCategory, setSelectedCategory] = useState<string>('all')
	const [bestsellers, setBestsellers] = useState<Product[]>([])
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [latestProducts, setLatestProducts] = useState<Product[]>([])
	useEffect(() => {
		setProducts(
			backend
				.getTestProducts()
				.filter(
					(p) => p.category === selectedCategory || selectedCategory === 'all'
				)
		)
	}, [selectedCategory])

	useEffect(() => {
		setProducts(
			backend
				.getTestProducts()
				.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
		)
	}, [searchTerm])

	useEffect(() => {
		const prods = backend.getTestProducts()
		const cats = backend.getCategories()
		const best = backend.getSixRandomProducts()
		const latestProds = productStorage.getLatestVisited()
		setProducts(prods)
		setCategories(cats)
		setLatestProducts(latestProds)
		setBestsellers(best)
	}, [])
	return (
		<div>
			<PageLayout>
				<NavigationBar />
				{/* Search bar */}
				<div className="mb-8">
					<div className="flex items-center h-10 space-x-4 mb-2">
						<input
							type="text"
							onChange={(e) => {
								setSearchTerm(e.target.value)
							}}
							placeholder="Search for products"
							className="w-full h-full border border-gray-200 rounded-lg py-1 px-2 focus:outline-none hover:border hover:border-sky-500 focus:ring focus:ring-sky-500 focus:ring-opacity-40"
						/>
						<button className="bg-sky-500 h-full w-10 flex items-center justify-center p-1 rounded-lg text-white">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</button>
					</div>
					<div className="flex space-x-2">
						<button
							onClick={() => {
								setSelectedCategory('all')
							}}
							className={`${
								selectedCategory === 'all'
									? 'bg-sky-500 border-sky-500'
									: 'bg-transparent border-gray-200'
							} bg-opacity-40 rounded-full px-2 text-sm border-2 `}
						>
							All
						</button>
						{categories.map((item, index) => (
							<button
								key={index}
								onClick={() => {
									if (selectedCategory === item.id) {
										setSelectedCategory('all')
									} else {
										setSelectedCategory(item.id)
									}
								}}
								className={`${
									selectedCategory === item.id
										? 'bg-sky-500 border-sky-500'
										: 'bg-transparent border-gray-200'
								} bg-opacity-40 rounded-full px-2 text-sm border-2 `}
							>
								{item.name}
							</button>
						))}
					</div>
				</div>
				{products.length == 0 && (
					<div className="w-full">
						<h1 className="text-center text-4xl font-semibold text-slate-800">
							No products found
						</h1>
					</div>
				)}
				<main
					className="grid grid-cols-4 mb-12
        "
				>
					{products.map((item: Product, index) => (
						<Link key={index} to={`/product/${item.id}`} className="snap-start">
							<div className="w-min hover:bg-slate-100 transition-colors p-2 md:p-4 rounded-lg">
								{/* product image */}
								<div className="max-h-[550px] w-48 h-48 overflow-hidden rounded-xl mb-2">
									<img
										className="object-cover w-full h-full self-center"
										src={item.imageUrl}
										alt=""
									/>
								</div>
								<h1 className="font-semibold text-sky-500 mb-2 underline">
									{item.name}
								</h1>
								<StarRating className="mb-6" />
								<h2>€{item.price}</h2>
							</div>
						</Link>
					))}
				</main>
				<HorizontalScroller title="Bestsellers" products={bestsellers} />
				{latestProducts.length > 0 && (
					<HorizontalScroller title="Last visited" products={latestProducts} />
				)}
			</PageLayout>
			<Footer />
		</div>
	)
}

export default Products
