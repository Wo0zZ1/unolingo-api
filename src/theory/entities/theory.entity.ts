import { IsDateString, IsJSON, IsNumber, IsString } from 'class-validator'
import { JsonValue } from '@prisma/client/runtime/library'

export class Theory {
	@IsNumber()
	id: number

	@IsNumber()
	sectionId: number

	@IsString()
	title: string

	@IsJSON({ each: true })
	paragraphs: JsonValue[]

	@IsDateString()
	createdAt: Date

	@IsDateString()
	updatedAt: Date
}
