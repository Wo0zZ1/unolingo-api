import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateSectionDto {
	@IsOptional()
	@IsNumber()
	order?: number

	@IsOptional()
	@IsString()
	name?: string

	@IsOptional()
	@IsNumber()
	languageId?: number
}
