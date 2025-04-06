import { IsString, IsOptional, IsJSON, IsObject } from 'class-validator'
import { InputJsonValue } from '@prisma/client/runtime/library'

export class UpdateTheoryDto {
	@IsOptional()
	@IsString()
	title?: string

	@IsOptional()
	@IsObject({ each: true })
	paragraphs?: InputJsonValue[]

	@IsOptional()
	@IsJSON()
	examples?: InputJsonValue
}
