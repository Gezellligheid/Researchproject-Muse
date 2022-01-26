import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from 'react-use-cart'
import { UseCartManager } from '../backend/cartManager'
import NavigationBar from '../components/NavigationBar'
import PageLayout from '../components/PageLayout'
import { Product } from '../entities/Product'

const Cart = () => {
	const [loading, setLoading] = useState(false)
	const [cart, setCart] = useState<Product[]>([])
	const {
		isEmpty,
		totalUniqueItems,
		items,
		updateItemQuantity,
		removeItem,
		addItem,
		inCart,
		cartTotal
	} = useCart()

	return (
		<div>
			<PageLayout>
				<NavigationBar />
				{!loading && (
					<>
						{items.length > 0 ? (
							<div className="w-full p-4 rounded-lg border-slate-300 border ">
								<div className="mb-8 flex justify-between">
									<div>
										<h1 className="text-xl font-semibold text-slate-900">
											Your cart
										</h1>
										<p className="text-sm font-semibold text-slate-700">
											{items.length} Item{items.length > 1 && 's'}
										</p>
									</div>
									<div>
										<h1 className="text-xl font-semibold text-slate-900">
											Total
										</h1>
										<p className="text-sm font-semibold text-slate-700">
											${cartTotal.toFixed(2)}
										</p>
									</div>
								</div>
								<div className="space-y-4 divide-y">
									{items.map((item, index) => (
										<div className="flex justify-between pt-4" key={index}>
											<div className="flex md:items-center md:space-x-4 space-y-4 md:space-y-4 md:flex-row flex-col">
												<div className="md:h-36 md:w-36 h-16 w-16 overflow-hidden rounded-lg">
													<img
														className="w-full h-full object-cover"
														src={item.imageUrl}
														alt=""
													/>
												</div>
												<div className="max-w-xl">
													<h1 className="mb-4 font-semibold text-xl">
														{item.name}
													</h1>
													<p>{item.price}$</p>
													<p>{item.description}</p>
												</div>
											</div>
											<div className="flex justify-end">
												<div>
													<button
														onClick={() => {
															removeItem(item.id)
														}}
														className="text-white p-2 bg-sky-500 rounded-lg hover:bg-sky-600"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="h-5 w-5"
															fill="none"
															viewBox="0 0 24 24"
															stroke="currentColor"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
															/>
														</svg>
													</button>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						) : (
							<div className="flex flex-col items-center">
								<h1 className=" text-4xl font-bold text-slate-800 mb-6">
									Your cart is empty
								</h1>
								<Link to="/products">
									<h1 className="bg-sky-500 py-2 px-4 rounded-full text-white font-semibold hover:bg-sky-600">
										Discover our products
									</h1>
								</Link>
							</div>
						)}
					</>
				)}
			</PageLayout>
		</div>
	)
}

export default Cart
