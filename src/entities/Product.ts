import { Offset } from './Offset'

export class Product {
	id!: string
	name!: string
	price!: number
	description!: string
	imageUrl!: string
	isAvailable!: boolean
	category!: string
	extraImages?: string[]
	rating!: number
	modelUrl?: string
	scale!: number
	offset!: Offset
	spawnOffset!: Offset
	rotationOffset!: Offset
}
