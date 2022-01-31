import { useState } from 'react'
// import * as THREE from "three";
import {
	Euler,
	HemisphereLight,
	Mesh,
	MeshBasicMaterial,
	Object3D,
	PerspectiveCamera,
	Quaternion,
	RingGeometry,
	Scene,
	Vector3,
	WebGLRenderer
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Product } from '../entities/Product'

//@ts-ignore
// let scene: any = {};
export const useAR = (() => {
	let arSupported
	let renderer: any = undefined
	let scene: THREE.Scene | undefined = undefined
	let arContainer: any = undefined
	let reticle: any
	let hitTestSource: any = null
	let hitTestSourceRequested = false
	let currentModel

	const isARSupported = (): Promise<boolean> => {
		return new Promise((resolve, reject) => {
			if ('xr' in navigator) {
				let supported = (navigator as any).xr
					.isSessionSupported('immersive-ar')
					.then((supported: any) => {
						console.log(supported)

						arSupported = supported
						return supported
					})
				resolve(supported)
			}
			reject(false)
		})
	}

	const initLights = (scene: THREE.Scene) => {
		const light = new HemisphereLight(0xffffff, 0xbbbbff, 1)
		light.position.set(0.5, 0, 0.25)
		scene.add(light)
	}

	const clearChildren = () => {
		if (scene) {
			scene.children.forEach((child: any) => {
				console.log(child)

				if (child.name !== 'reticle') {
					scene!.remove(child)
				}
			})
			initLights(scene)
		}
	}

	const loadModel = (modelLocation: string) => {
		const loader = new GLTFLoader()
		return new Promise((resolve, reject) => {
			loader.load(modelLocation, (gltf: any) => {
				const newModel = gltf.scene.children[0]
				resolve(newModel)
			})
		})
	}

	const initScene = (model: Object3D, product: Product) => {
		const container = document.createElement('div')
		arContainer = container
		container.classList.toggle('hidden')
		document.body.appendChild(container)
		let sc = new Scene()
		let camera = new PerspectiveCamera(
			70,
			window.innerWidth / window.innerHeight,
			0.01,
			20
		)

		initLights(sc)

		let x = new WebGLRenderer({ antialias: true, alpha: true })
		x.setPixelRatio(window.devicePixelRatio)
		x.setSize(window.innerWidth, window.innerHeight)
		x.xr.enabled = true
		// Add dragcontrols to the model
		sc.add(model)

		model.position.set(
			0 + product.spawnOffset.x * (product.scale * 10),
			0 + product.spawnOffset.y * (product.scale * 10),
			0 + product.spawnOffset.z * (product.scale * 10)
		)
		model.scale.set(product.scale, product.scale, product.scale)
		model.name = 'model'
		model.updateMatrix()
		// console.log(model);

		const onSelect = () => {
			if (reticle.visible) {
				scene!
					.getObjectByName('model')!
					.position.setFromMatrixPosition(reticle.matrix)
					.add(
						new Vector3(
							0 + product.offset.x * (product.scale * 10),
							0 + product.offset.y * (product.scale * 10),
							0 + product.offset.z * (product.scale * 10)
						)
					)

				let x = scene!.getObjectByName('model')!

				// rotate model to the camera via quaternion
				// let q = new Euler(
				// 	0 + product.rotationOffset.x * (product.scale * 10),
				// 	0 + product.rotationOffset.y * (product.scale * 10),
				// 	0 + product.rotationOffset.z * (product.scale * 10)
				// )
				// let quat = new Quaternion()
				// quat.setFromEuler(q)
				// x.quaternion.copy(quat)
				// x.updateMatrix()
				// console.log(x);

				// x.lookAt(camera.position)

				x.rotation.set(
					product.rotationOffset.x,
					product.rotationOffset.y,
					product.rotationOffset.z
				)

				// Rotate the model to the camera via quaternion and include the rotationOffset and offset
				// let q = new Euler(
				// 	0 + product.rotationOffset.x * (product.scale * 10),
				// 	0 + product.rotationOffset.y * (product.scale * 10),
				// 	0 + product.rotationOffset.z * (product.scale * 10)
				// )
				// let quat = new Quaternion()
				// quat.setFromEuler(q)
				// x.quaternion.copy(quat)
				// x.updateMatrix()
				// console.log(x);

				// x.rotateY(-(Math.PI / 2))
				x.updateMatrixWorld()
				x.updateMatrix()
			}
		}
		let controller = x.xr.getController(0)
		controller.addEventListener('select', onSelect)
		sc.add(controller)

		reticle = new Mesh(
			new RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
			new MeshBasicMaterial()
		)
		reticle.matrixAutoUpdate = false
		reticle.visible = false
		reticle.name = 'reticle'
		sc.add(reticle)
		scene = sc
		// div.current!.appendChild(x.domElement);
		x.setAnimationLoop((timestamp, frame) => {
			if (frame) {
				const referenceSpace = x.xr.getReferenceSpace()
				const session = x.xr.getSession()

				if (hitTestSourceRequested === false) {
					session!
						.requestReferenceSpace('viewer')
						.then(function (referenceSpace) {
							session!
								.requestHitTestSource({ space: referenceSpace })
								.then(function (source) {
									hitTestSource = source
								})
						})

					session!.addEventListener('end', function () {
						hitTestSourceRequested = false
						hitTestSource = null
					})

					hitTestSourceRequested = true
				}

				if (hitTestSource) {
					const hitTestResults = frame.getHitTestResults(hitTestSource)

					if (hitTestResults.length) {
						const hit = hitTestResults[0]

						reticle.visible = true
						reticle.matrix.fromArray(
							hit.getPose(referenceSpace!)!.transform.matrix
						)
					} else {
						reticle.visible = false
					}
				}
			}

			x.render(scene!, camera)
			// moveObject();
			// console.log("run");
		})
		renderer = x

		const onWindowResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight
			camera.updateProjectionMatrix()
			x.setSize(window.innerWidth, window.innerHeight)
		}
		window.addEventListener('resize', onWindowResize)
		// scene = sc;
		return x
	}

	const createSessionIfSupported = (
		model: THREE.Object3D,
		product: Product
	): Promise<THREE.WebGLRenderer> => {
		return new Promise(async (resolve, reject) => {
			try {
				clearChildren()
				let supported = await isARSupported()
				if (supported) {
					const renderer = initScene(model, product)
					resolve(renderer)
				}
			} catch (e) {
				console.log(e)

				reject()
			}
		})
	}

	const getRenderer = () => {
		return renderer
	}

	const getARContainer = () => {
		return arContainer
	}

	return {
		getARContainer,
		isARSupported,
		createSessionIfSupported,
		getRenderer,
		clearChildren
	}
})()
