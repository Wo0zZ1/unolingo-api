import { IsDateString, IsJSON, IsNumber, IsOptional, IsString } from 'class-validator'
import { JsonValue } from '@prisma/client/runtime/library'

export class Theory {
	@IsNumber()
	id: number

	@IsNumber()
	sectionId: number

	@IsString()
	title: string

	@IsString({ each: true })
	paragraphs: string[]

	@IsOptional()
	@IsJSON()
	examples?: JsonValue

	@IsDateString()
	createdAt: Date

	@IsDateString()
	updatedAt: Date
}
