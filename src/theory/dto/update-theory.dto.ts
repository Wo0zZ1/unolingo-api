import { IsString, IsOptional, IsJSON } from 'class-validator'
import { InputJsonValue } from '@prisma/client/runtime/library'

export class UpdateTheoryDto {
	@IsOptional()
	@IsString()
	title?: string

	@IsOptional()
	@IsString({ each: true })
	paragraphs?: string[]

	@IsOptional()
	@IsJSON()
	examples?: InputJsonValue
}
