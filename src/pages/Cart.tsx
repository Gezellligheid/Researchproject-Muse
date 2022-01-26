import React from 'react'
import { Link } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'
import PageLayout from '../components/PageLayout'

const Cart = () => {
	return (
		<div>
			<PageLayout>
				<NavigationBar />
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
				<div className="w-full p-4 rounded-lg border-slate-300 border ">
					<div className="mb-8 flex justify-between">
						<div>
							<h1 className="text-xl font-semibold text-slate-900">
								Your cart
							</h1>
							<p className="text-sm font-semibold text-slate-700">1 Item</p>
						</div>
						<div>
							<h1 className="text-xl font-semibold text-slate-900">Total</h1>
							<p className="text-sm font-semibold text-slate-700">$0.00</p>
						</div>
					</div>

					<div className="flex justify-between">
						<div className="flex items-center space-x-4">
							<div className="h-36 w-36 overflow-hidden rounded-lg">
								<img
									className="w-full h-full object-cover"
									src="https://via.placeholder.com/150"
									alt=""
								/>
							</div>
							<div className="max-w-xl">
								<h1 className="mb-4 font-semibold text-xl">Guitar</h1>
								<p>600$</p>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
									itaque expedita iusto ratione in eum debitis rem nobis
									cupiditate repellendus voluptates totam, hic sunt libero
									reprehenderit et est eius nam?
								</p>
							</div>
						</div>
						<div className="flex justify-end">
							<div>
								<button className="text-white p-2 bg-sky-500 rounded-lg hover:bg-sky-600">
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
				</div>
			</PageLayout>
		</div>
	)
}

export default Cart
