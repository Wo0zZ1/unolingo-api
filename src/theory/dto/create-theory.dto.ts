import { IsNumber, IsString, IsOptional, IsJSON } from 'class-validator'
import { InputJsonValue } from '@prisma/client/runtime/library'

export class CreateTheoryDto {
	@IsNumber()
	sectionId: number

	@IsString()
	title: string

	@IsString({ each: true })
	paragraphs: string[]

	@IsOptional()
	@IsJSON()
	examples?: InputJsonValue
}
