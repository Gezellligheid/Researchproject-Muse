import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../entities/Product'
import StarRating from './StarRating'

type props = {
	title: string
	products: Array<Product>
}

const HorizontalScroller: FC<props> = (props) => {
	return (
		<>
			<h1 className="text-slate-900 font-bold text-2xl mb-4">{props.title}</h1>
			<div
				className="flex space-x-1 md:space-x-4 overflow-x-auto snap-x scrollbar mb-8 pb-4
    scrollbar-thumb-gray-200
    scrollbar-thumb-rounded-lg
    scrollbar-thin"
			>
				{props.products.map((item, index) => (
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
			</div>
		</>
	)
}

export default HorizontalScroller
