import React, { FC, useEffect, useRef, useState, Fragment } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useVR } from '../util/UseVR'
import { Dialog, Transition } from '@headlessui/react'

type props = {
	modelUrl: string
}

const VRButton: FC<props> = (props: any) => {
	const [vrSupported, setVrSupported] = useState(false)
	const [sessionInit, setSessionInit] = useState<any>({})
	const [currentSession, setCurrentSession] = useState<any>()
	const [overlayShown, setOverlayShown] = useState(false)
	const [container, setContainer] = useState<HTMLDivElement>()
	const [renderer, setRenderer] = useState<THREE.WebGLRenderer>()
	const [dialogOpen, setDialogOpen] = useState(false)

	// let overlay: any = undefined;
	const overlay = useRef<HTMLDivElement>(null)
	const {
		isVRSupported,
		createSessionIfSupported,
		getRenderer,
		getVRContainer,
		clearChildren
	} = useVR

	const [amount, setAmount] = useState(0)

	useEffect(() => {
		;(async () => {
			let supported = await isVRSupported()
			setVrSupported(supported)
		})()
	}, [])

	const startSession = () => {
		// Starting the session
		if (!vrSupported) {
			setDialogOpen(true)
		}
		if (vrSupported && currentSession === undefined) {
			// Defining settings for the session
			if (sessionInit.optionalFeatures === undefined) {
				sessionInit.optionalFeatures = []
			}
			if (sessionInit.requiredFeatures === undefined) {
				sessionInit.requiredFeatures = []
			}
			sessionInit.optionalFeatures.push(
				'local-floor',
				'bounded-floor',
				'hand-tracking',
				'layers'
			)
			// sessionInit.requiredFeatures.push("hit-test");

			// Loading the 3D model
			const loader = new GLTFLoader()
			loader.load(props.modelUrl, (gltf) => {
				const mesh = gltf.scene.children[0]
				createSessionIfSupported(mesh, overlay.current!).then((renderer) => {
					setRenderer(renderer)
					setContainer(getVRContainer())
				})
				// mesh.add(gltf.scene);
			})
		}
	}

	useEffect(() => {
		if (renderer) {
			sessionInit.domOverlay = { root: overlay.current! }
			;(navigator as any).xr
				.requestSession('immersive-vr', sessionInit)
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

	return (
		<>
			<div>
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
									<div className="mt-2">
										<p className="text-sm text-gray-500">
											This device does not have VR capabilities. Please put your
											VR headset, surf to this page and try again.
										</p>
									</div>

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
				<button
					className={`
							bg-transparent-400
						 py-2 rounded-full px-6 w-full md:w-max space-x-2 border-2 text-sm border-sky-500 font-bold text-sky-500 flex items-center justify-center`}
					onClick={startSession}
				>
					<svg
						className="w-5 h-5 "
						version="1.0"
						xmlns="http://www.w3.org/2000/svg"
						width="512.000000pt"
						height="512.000000pt"
						viewBox="0 0 512.000000 512.000000"
						preserveAspectRatio="xMidYMid meet"
					>
						<g
							transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
							fill="currentcolor"
						>
							<path
								d="M482 4141 c-115 -29 -196 -75 -288 -166 -88 -88 -130 -153 -166 -260
l-23 -70 0 -1085 0 -1085 27 -73 c72 -197 222 -344 413 -405 69 -22 79 -22
650 -22 571 0 581 0 650 22 127 41 184 83 420 314 196 192 226 218 278 237 76
29 159 29 234 0 52 -19 83 -45 278 -237 236 -231 292 -273 420 -314 69 -22 79
-22 650 -22 571 0 581 0 650 22 95 30 185 86 259 159 72 73 117 145 154 246
l27 73 0 1085 0 1085 -23 70 c-36 107 -78 172 -166 260 -92 91 -167 134 -290
165 -78 20 -110 20 -2080 19 -1886 0 -2005 -2 -2074 -18z m4143 -311 c64 -31
134 -101 165 -165 l25 -50 0 -1050 0 -1050 -28 -56 c-32 -66 -99 -132 -165
-162 -46 -22 -55 -22 -592 -22 -514 0 -548 1 -595 19 -41 16 -90 59 -275 240
-188 185 -237 227 -297 259 -194 101 -412 101 -606 0 -60 -32 -109 -74 -297
-259 -185 -181 -234 -224 -275 -240 -47 -18 -81 -19 -595 -19 l-545 0 -56 28
c-66 32 -132 99 -162 165 l-22 47 0 1050 0 1050 25 50 c43 88 135 164 225 186
17 4 928 6 2025 6 l1995 -2 50 -25z"
							/>
							<path
								d="M1345 3189 c-79 -12 -116 -24 -207 -71 -173 -89 -300 -270 -328 -469
-26 -178 34 -369 160 -512 43 -50 143 -121 213 -151 64 -29 187 -56 252 -56
135 0 313 69 417 161 78 68 151 181 184 282 38 117 39 267 1 383 -77 234 -275
399 -521 433 -86 12 -86 12 -171 0z m228 -327 c38 -16 74 -43 107 -78 137
-151 106 -383 -68 -498 -136 -90 -306 -66 -421 59 -89 98 -111 232 -57 350 79
175 264 245 439 167z"
							/>
							<path
								d="M3591 3189 c-232 -35 -434 -207 -507 -433 -31 -95 -38 -244 -15 -336
31 -129 125 -275 226 -353 104 -79 268 -137 390 -137 79 0 197 30 280 71 312
153 438 531 284 845 -119 240 -391 382 -658 343z m229 -325 c116 -52 193 -170
194 -294 1 -91 -25 -159 -85 -225 -117 -127 -287 -149 -426 -55 -168 113 -198
343 -66 490 102 113 246 145 383 84z"
							/>
						</g>
					</svg>

					<h1>View in VR</h1>
				</button>

				<div
					ref={overlay}
					className="bg-slate-800 p-4 w-96 rounded-xl flex justify-end"
				>
					<button
						className="text-white pointer-events-auto"
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
				</div>

				<div className="hidden pointer-events-none">
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
					{/* <div className="absolute bottom-0 right-0 w-20 h-20 bg-red-500"></div> */}
				</div>
			</div>
		</>
	)
}

export default VRButton
