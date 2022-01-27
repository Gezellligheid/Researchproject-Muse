import { useState } from 'react'
import {
	Box3,
	BufferGeometry,
	CircleGeometry,
	Color,
	Group,
	HemisphereLight,
	Line,
	Matrix4,
	Mesh,
	MeshStandardMaterial,
	Object3D,
	PerspectiveCamera,
	Raycaster,
	Scene,
	sRGBEncoding,
	Vector3,
	WebGLRenderer
} from 'three'
import { create } from 'domain'
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory'
import { XRHandModelFactory } from 'three/examples/jsm/webxr/XRHandModelFactory'
import GUI from 'lil-gui'
import { HTMLMesh } from 'three/examples/jsm/interactive/HTMLMesh'
// import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { InteractiveGroup } from 'three/examples/jsm/interactive/InteractiveGroup'
//@ts-ignore
// let scene: any = {};
export const useVR = (() => {
	let arSupported
	let renderer: any = undefined
	let scene: THREE.Scene | undefined = undefined
	let vrContainer: any = undefined
	let raycaster: Raycaster
	let intersected: any = []
	let reticle: any
	let hitTestSource: any = null
	let hitTestSourceRequested = false
	let controllerGrip1, controllerGrip2
	let hand1, hand2
	const tempMatrix = new Matrix4()
	let controller1: any, controller2: any
	let menu: HTMLMesh

	let group: any

	const isVRSupported = (): Promise<boolean> => {
		return new Promise((resolve, reject) => {
			if ('xr' in navigator) {
				let supported = (navigator as any).xr
					.isSessionSupported('immersive-vr')
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

	const initScene = (model: Object3D, overlay: HTMLDivElement) => {
		const container = document.createElement('div')
		vrContainer = container
		container.classList.toggle('hidden')
		document.body.appendChild(container)
		let sc = new Scene()
		let camera = new PerspectiveCamera(
			50,
			window.innerWidth / window.innerHeight,
			0.1,
			10
		)
		camera.position.set(0, 2, 3)

		initLights(sc)
		sc.background = new Color(0x87ceeb)

		const floorGeometry = new CircleGeometry(4, 32)
		const floorMaterial = new MeshStandardMaterial({
			color: 0xffaaaa,
			roughness: 1.0,
			metalness: 0.0
		})
		const floor = new Mesh(floorGeometry, floorMaterial)
		floor.rotation.x = -Math.PI / 2
		floor.position.y = -0.5
		floor.receiveShadow = true
		sc.add(floor)

		let x = new WebGLRenderer({ antialias: true, alpha: true })
		x.setPixelRatio(window.devicePixelRatio)
		x.setSize(window.innerWidth, window.innerHeight)
		x.xr.enabled = true
		x.outputEncoding = sRGBEncoding
		x.shadowMap.enabled = true

		model.position.set(0, 0, -1)
		model.scale.set(1, 1, 1)
		model.name = 'model'
		// console.log(model);
		model.castShadow = true
		model.receiveShadow = true

		// sc.add(model);
		// let geo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
		// let mat = new THREE.MeshStandardMaterial({
		//   color: 0xff0000,

		//   roughness: 1.0,
		//   metalness: 0.0,
		// });
		// let cube = new THREE.Mesh(geo, mat);
		// cube.position.set(0, 0, -1);
		// cube.castShadow = true;
		// cube.receiveShadow = true;
		group = new Group()
		sc.add(group)
		group.add(model)
		// group.add(model);

		// Controllers
		controller1 = x.xr.getController(0)
		controller1.addEventListener('selectstart', onSelectStart)
		controller1.addEventListener('selectend', onSelectEnd)
		sc.add(controller1)

		controller2 = x.xr.getController(1)
		controller2.addEventListener('selectstart', onSelectStart)
		controller2.addEventListener('selectend', onSelectEnd)
		sc.add(controller2)

		const controllerModelFactory = new XRControllerModelFactory()
		const handModelFactory = new XRHandModelFactory()

		controllerGrip1 = x.xr.getControllerGrip(0)
		controllerGrip1.add(
			controllerModelFactory.createControllerModel(controllerGrip1)
		)
		sc.add(controllerGrip1)

		hand1 = x.xr.getHand(0)
		hand1.add(handModelFactory.createHandModel(hand1))
		sc.add(hand1)

		controllerGrip2 = x.xr.getControllerGrip(1)
		controllerGrip2.add(
			controllerModelFactory.createControllerModel(controllerGrip2)
		)
		sc.add(controllerGrip2)

		hand2 = x.xr.getHand(1)
		hand2.add(handModelFactory.createHandModel(hand2))
		sc.add(hand2)
		const controllerLine = new BufferGeometry().setFromPoints([
			new Vector3(0, 0, 0),
			new Vector3(0, 0, -1)
		])

		const line = new Line(controllerLine)
		line.name = 'ControllerLine'
		line.scale.z = 5

		controller1.add(line.clone())
		controller2.add(line.clone())
		raycaster = new Raycaster()

		let inputs = {
			closeButton: () => {}
		}
		let gui = new GUI()
		gui.add(inputs, 'closeButton').name('Close VR session')

		const g = new InteractiveGroup(x, camera)
		sc.add(g)

		menu = new HTMLMesh(gui.domElement)
		menu.position.x = -0.75
		menu.position.y = camera.position.y
		menu.position.z = -0.5
		menu.rotation.y = Math.PI / 4
		menu.scale.setScalar(2)

		g.add(menu)

		scene = sc
		// div.current!.appendChild(x.domElement);

		function onSelectStart(event: any) {
			const controller = event.target

			const intersections = getIntersections(controller)

			if (intersections.length > 0) {
				const intersection = intersections[0]
				const object = intersection.object
				;(object as any).material.emissive.b = 1
				controller.attach(object)

				controller.userData.selected = object
			}
		}

		function onSelectEnd(event: any) {
			const controller = event.target

			if (controller.userData.selected !== undefined) {
				const object = controller.userData.selected
				object.material.emissive.b = 0
				group.attach(object)

				controller.userData.selected = undefined
			}
		}

		function getIntersections(controller: any) {
			tempMatrix.identity().extractRotation(controller.matrixWorld)

			raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld)
			raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix)

			return raycaster.intersectObjects(group.children, true)
		}

		function intersectObjects(controller: any) {
			// Do not highlight when already selected

			if (controller.userData.selected !== undefined) return

			const line = controller.getObjectByName('ControllerLine')
			const intersections = getIntersections(controller)
			console.log(intersections)

			if (intersections.length > 0) {
				const intersection = intersections[0]

				const object = intersection.object
				;(object as any).material.emissive.r = 1
				intersected.push(object)

				line.scale.z = intersection.distance
			} else {
				line.scale.z = 5
			}
		}

		function cleanIntersected() {
			while (intersected.length) {
				const object = intersected.pop()
				object.material.emissive.r = 0
			}
		}
		const onWindowResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight
			camera.updateProjectionMatrix()
			x.setSize(window.innerWidth, window.innerHeight)
		}
		window.addEventListener('resize', onWindowResize)
		// scene = sc;
		x.setAnimationLoop((timestamp, frame) => {
			cleanIntersected()

			intersectObjects(controller1)
			intersectObjects(controller2)
			x.render(scene!, camera)
			// keep menu in fron of the camera also when rotating

			// Get rico of y rotation
			// let v = new Vector3()
			// camera.getWorldDirection(v)
			// v.multiplyScalar(0.5)
			// v.add(camera.position)
			// menu.position.set(v.x, v.y, v.z)
			// menu.rotation.y = camera.rotation.y
			// menu.rotation.y = 35
			menu.lookAt(camera.position)
			// get directional coefficient of camera

			// Set the menu in front of the camera
			menu.position.y = camera.position.y - 0.5
			// menu.position.z = camera.position.y

			// moveObject();
			// console.log("run");
		})
		renderer = x
		return x
	}

	const createSessionIfSupported = (
		model: THREE.Object3D,
		overlay: HTMLDivElement
	): Promise<THREE.WebGLRenderer> => {
		return new Promise(async (resolve, reject) => {
			try {
				clearChildren()
				let supported = await isVRSupported()
				if (supported) {
					// let geom = new BufferGeometry()
					// geom.applyMatrix4(model.matrix)
					// geom.applyMatrix4(model.matrixWorld)
					// // Get material of the model
					// let mat = (model as any).material
					// let mesh = new Mesh(geom, mat)
					const renderer = initScene(model, overlay)

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

	const getVRContainer = () => {
		return vrContainer
	}

	return {
		getVRContainer,
		isVRSupported,
		createSessionIfSupported,
		getRenderer,
		clearChildren
	}
})()
