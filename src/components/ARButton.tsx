import React, { FC, useEffect, useRef, useState, Fragment } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useAR } from '../util/UseAR'
import { Dialog, Transition } from '@headlessui/react'
import QRCode from 'react-qr-code'
import { useNavigate } from 'react-router-dom'
import { useCart } from 'react-use-cart'
import { Product } from '../entities/Product'

type props = {
	modelUrl: string
	product: Product
}

const ARButton: FC<props> = (props: any) => {
	const [arSupported, setArSupported] = useState(false)
	const [sessionInit, setSessionInit] = useState<any>({})
	const [currentSession, setCurrentSession] = useState<any>()
	const [overlayShown, setOverlayShown] = useState(false)
	const [container, setContainer] = useState<HTMLDivElement>()
	const [renderer, setRenderer] = useState<THREE.WebGLRenderer>()
	const [dialogOpen, setDialogOpen] = useState(false)
	const {
		isEmpty,
		totalUniqueItems,
		items,
		updateItemQuantity,
		removeItem,
		addItem,
		inCart
	} = useCart()
	// let overlay: any = undefined;
	const overlay = useRef<HTMLDivElement>(null)
	const {
		isARSupported,
		createSessionIfSupported,
		getRenderer,
		getARContainer,
		clearChildren
	} = useAR
	let navigate = useNavigate()

	useEffect(() => {
		;(async () => {
			let supported = await isARSupported()
			setArSupported(supported)
		})()
	}, [])

	const startSession = () => {
		// Starting the session
		if (!arSupported) {
			setDialogOpen(true)
		}
		if (arSupported && currentSession === undefined) {
			// Defining settings for the session
			if (sessionInit.optionalFeatures === undefined) {
				sessionInit.optionalFeatures = []
			}
			if (sessionInit.requiredFeatures === undefined) {
				sessionInit.requiredFeatures = []
			}
			sessionInit.optionalFeatures.push('dom-overlay')
			sessionInit.requiredFeatures.push('hit-test')
			sessionInit.domOverlay = { root: overlay.current! }

			// Loading the 3D model
			const loader = new GLTFLoader()
			loader.load(props.modelUrl, (gltf) => {
				const mesh = gltf.scene.children[0]
				console.log(gltf.scene.children[0])

				createSessionIfSupported(mesh).then((renderer) => {
					setRenderer(renderer)
					setContainer(getARContainer())
				})
				// mesh.add(gltf.scene);
			})
		}
	}

	useEffect(() => {
		if (renderer) {
			sessionInit.domOverlay = { root: overlay.current! }
			;(navigator as any).xr
				.requestSession('immersive-ar', sessionInit)
				.then(async (session: any) => {
					session.addEventListener('end', () => {
						clearChildren()
						session.removeEventListener('end', () => {})
						setCurrentSession(undefined)
						overlay.current!.classList.toggle('hidden')
					})
					renderer!.xr.setReferenceSpaceType('local')
					overlay.current!.classList.toggle('hidden')

					setOverlayShown(true)
					setCurrentSession(session)

					await renderer!.xr.setSession(session)
				})
		}
	}, [renderer])

	const closeSession = () => {
		currentSession.end()
		setOverlayShown(false)
	}

	const buh = () => {
		console.log('boe')

		currentSession.end().then(() => {
			setOverlayShown(false)
			navigate('/cart')
		})
	}

	const addToCart = () => {
		addItem(props.product)
	}

	return (
		<>
			<Transition appear show={dialogOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50"
					onClose={() => {
						setDialogOpen(false)
					}}
				>
					<div className="min-h-screen px-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0" />
						</Transition.Child>
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium leading-6 text-gray-900"
								>
									Device not supported
								</Dialog.Title>
								<div className="mt-2 mb-4">
									<p className="text-sm text-gray-500">
										Scan the QR code below with an AR supported device.
									</p>
								</div>
								<QRCode
									className="mx-auto mb-4 rounded-lg border-slate-200 border"
									value={window.location.href}
									size={256}
									fgColor="#0f172a"
								/>
								<div className="mt-4">
									<button
										type="button"
										className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-sky-500 hover:bg-sky-600 focus:ring focus:ring-sky-500 focus:ring-opacity-25 rounded-lg text-white focus:outline-none"
										onClick={() => {
											setDialogOpen(false)
										}}
									>
										Okay, thanks
									</button>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
			<div>
				<button
					className={`bg-transparent py-2 rounded-full text-sm px-6 w-full md:w-max border-2 space-x-2 border-sky-500 font-bold text-sky-500 flex items-center justify-center`}
					onClick={startSession}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
							clipRule="evenodd"
						/>
					</svg>
					<h1>View in AR</h1>
				</button>

				<div ref={overlay} className="hidden pointer-events-none min-h-screen">
					<button
						className="text-white absolute right-8 top-8 pointer-events-auto"
						onClick={closeSession}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
					<div className="absolute pointer-events-auto top-4 left-4">
						<button
							onClick={buh}
							className="  relative w-10 h-10 flex items-center justify-center text-white bg-sky-500 p-2 rounded-full"
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
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
						</button>
						<span className="absolute -top-1 -right-1 bg-white w-5 h-5 flex items-center justify-center rounded-full bg-opacity-75 text-slate-900 font-semibold text-sm">
							{totalUniqueItems}
						</span>
					</div>

					<div className="flex pointer-events-auto w-full justify-center absolute bottom-4">
						<button
							onClick={addToCart}
							className=" bg-sky-500  text-white font-semibold px-4 py-2 rounded-full focus:ring focus:ring-sky-500 focus:ring-opacity-30"
						>
							{inCart(props.product.id) ? 'Already in cart' : 'Add to Cart'}
						</button>
					</div>
					{/* <div className="absolute bottom-0 right-0 w-20 h-20 bg-red-500"></div> */}
				</div>
			</div>
		</>
	)
}

export default ARButton
