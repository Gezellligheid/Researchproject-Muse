import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from 'react-use-cart'
import { UseCartManager } from '../backend/cartManager'
import { Product } from '../entities/Product'

function NavigationBar() {
	const { isEmpty, totalUniqueItems, items, updateItemQuantity, removeItem } =
		useCart()
	const [open, setOpen] = useState(false)
	const [links, setlinks] = useState([
		{
			name: 'Home',
			path: '/'
		},
		{
			name: 'Products',
			path: '/products'
		}
	])
	const [cart, setCart] = useState<Product[]>([])
	const toggleMenu = () => {
		setOpen(!open)
		if (open) {
			document.body.style.overflow = 'auto'
		} else {
			document.body.style.overflow = 'hidden'
		}
	}

	// reset overflow of body on leave of component
	useEffect(() => {
		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [])

	return (
		<div className="py-6">
			<aside
				className={`absolute left-0 top-0 min-h-screen w-full bg-white z-10 transform transition-transform duration-300 ease-in-out ${
					!open ? '-translate-x-full' : '-translate-x-0'
				}`}
			>
				<div className="flex flex-col p-6">
					<div className="flex justify-between mb-6">
						<h1 className="text-lg font-bold text-slate-900">Muse.</h1>
						<button
							onClick={() => {
								toggleMenu()
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 text-slate-900"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
					{links.map((link, index) => (
						<Link
							to={link.path}
							key={index}
							className=" py-3 font-semibold text-slate-900 hover:text-slate-600"
						>
							{link.name}
						</Link>
					))}
				</div>
			</aside>
			<nav className="flex justify-between items-center">
				<div>
					<h1 className="font-bold text-gray-900 text-lg">Muse.</h1>
				</div>
				<div>
					<div className="flex space-x-6 items-center text-gray-900 text-sm font-semibold ">
						{links.map((item, index) => (
							<Link
								to={item.path}
								key={index}
								className="group hidden md:block"
							>
								<h1>{item.name}</h1>
								<div className="w-full h-0.5 rounded-full ring-1 ring-sky-500 ring-opacity-25 bg-sky-500 group-hover:opacity-100 -mt-1 group-hover:-mt-0 opacity-0 transition-all" />
							</Link>
						))}

						<Link
							to="/cart"
							className="relative w-8 h-8 flex items-center justify-center rounded-full  hover:border-sky-500 hover:ring hover:ring-sky-500 hover:ring-opacity-25 hover:border transition-all"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4 text-gray-600"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
							</svg>
							<span className="absolute -top-2 -right-2 bg-blue-500 bg-opacity-30 text-sm text-slate-900 w-4 h-4 flex items-center justify-center rounded-full">
								{totalUniqueItems}
							</span>
						</Link>
						<button
							onClick={() => {
								toggleMenu()
							}}
							className="w-8 h-8 relative flex md:hidden items-center justify-center rounded-full  hover:border-sky-500 hover:ring hover:ring-sky-500 hover:ring-opacity-25 hover:border transition-all"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</div>
				</div>
			</nav>
		</div>
	)
}

export default NavigationBar
