import React, { FC, useEffect, useState } from 'react'
import { useCart } from 'react-use-cart'
import { UseCartManager } from '../backend/cartManager'
import { Product } from '../entities/Product'
import ARButton from './ARButton'
import StarRating from './StarRating'
import VRButton from './VRButton'

type props = {
	toShowProduct: Product
}

const ProductViewSimple: FC<props> = (props: any) => {
	const [selectedImage, setSelectedImage] = useState('')
	const {
		isEmpty,
		totalUniqueItems,
		items,
		updateItemQuantity,
		removeItem,
		addItem,
		inCart
	} = useCart()

	useEffect(() => {
		setSelectedImage(props.toShowProduct.imageUrl)
	}, [props.toShowProduct])

	const changeImage = (imageUrl: string) => {
		setSelectedImage(imageUrl)
	}

	return (
		<section className=" grid grid-cols-1 md:grid-cols-2 mb-8 gap-8">
			<div className="flex flex-col md:flex-row  gap-4">
				<div className="w-auto max-h-96 md:h-auto md:w-96 overflow-hidden rounded-lg flex items-center justify-center">
					<img
						className="w-full h-full object-cover"
						src={selectedImage}
						alt=""
					/>
				</div>
				<div
					className="md:pr-4 md:-mr-4 max-h-96 pb-4 -mb-4 md:pb-0 md:-pb-0 h-max w-full md:w-max md:h-full grid grid-rows-1 md:grid-rows-none grid-flow-col md:grid-flow-row overflow-x-auto md:overflow-x-auto md:overflow-y-auto md:space-y-4 space-x-4 md:space-x-0 scrollbar-thin scrollbar scrollbar-thumb-gray-200
    scrollbar-thumb-rounded-lg
    scrollbar-thin relative"
				>
					<button
						onClick={() => {
							changeImage(props.toShowProduct.imageUrl)
						}}
						className=" overflow-hidden rounded-lg w-24 h-24 tems-center justify-center"
					>
						<img
							className=" object-cover "
							src={props.toShowProduct.imageUrl}
							alt=""
						/>
					</button>
					{props.toShowProduct.extraImages &&
						props.toShowProduct.extraImages.map(
							(imageUrl: string, index: any) => (
								<button
									key={index}
									onClick={() => {
										changeImage(imageUrl)
									}}
									className=" overflow-hidden  rounded-lg w-24 h-24   items-center justify-center"
								>
									<img
										className=" object-cover h-full w-full"
										src={imageUrl}
										alt=""
									/>
								</button>
							)
						)}
				</div>
			</div>
			<div className="flex flex-col justify-center">
				<h1 className="font-semibold mb-6">{props.toShowProduct.name}</h1>
				<h1 className="text-2xl font-bold">
					€{props.toShowProduct.price.toFixed(2)}
				</h1>
				<StarRating />
				<p className="mt-12 font-semibold text-slate-600 mb-8">
					{props.toShowProduct.description}
				</p>
				<button
					onClick={() => {
						if (!inCart(props.toShowProduct.id)) {
							addItem(props.toShowProduct)
						}
					}}
					className="md:w-max mb-2 bg-sky-500 text-white font-bold py-2 px-4 rounded-full hover:bg-sky-600 focus:ring focus:ring-sky-500 focus:ring-opacity-25"
				>
					{inCart(props.toShowProduct.id) ? 'Already in Cart' : 'Add to Cart'}
				</button>
				<div>
					{props.toShowProduct.modelUrl && (
						<div className="flex md:space-x-2 flex-col md:flex-row space-y-4 md:space-y-0">
							<ARButton
								product={props.toShowProduct}
								modelUrl={window.location.origin + props.toShowProduct.modelUrl}
							/>
							<VRButton
								modelUrl={window.location.origin + props.toShowProduct.modelUrl}
							/>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}

export default ProductViewSimple
