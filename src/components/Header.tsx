import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
	return (
		<div className="mb-16">
			<div className="grid grid-cols-2 gap-2 md:gap-6 mb-6">
				<div className="space-y-4">
					<div className="max-h-[350px] md:max-h-[550px] overflow-hidden rounded-xl">
						<img
							className="object-cover w-full h-full self-center"
							src="https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=650&q=80"
							alt=""
						/>
					</div>

					<h1 className="font-bold text-4xl md:text-9xl text-right text-slate-800 ">
						Muse.
					</h1>
				</div>
				<div>
					<div className="w-full h-full overflow-hidden rounded-xl">
						<img
							className="object-cover h-full w-full  self-center"
							src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
							alt=""
						/>
					</div>
				</div>
			</div>
			<div className="grid md:grid-cols-2 md:gap-6">
				<div className="col-start-2 max-w-lg">
					<p className="mb-6 font-medium text-slate-700">
						Muse. The musical webshop with a touch of technology. Check out your
						instrument before you even buy it!
						<br /> Discover Muse Now!
					</p>
					<Link to="/products">
						<button className="bg-sky-500 px-4 py-2 rounded-full font-semibold text-white hover:bg-sky-600 transition-all duration-200 focus:outline-none focus:ring focus:ring-sky-500 focus:ring-opacity-30">
							Discover Muse
						</button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Header
