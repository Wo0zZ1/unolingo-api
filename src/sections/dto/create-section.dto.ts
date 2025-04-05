import { IsNumber, IsString } from 'class-validator'

export class CreateSectionDto {
	@IsNumber()
	order: number

	@IsString()
	name: string

	@IsNumber()
	languageId: number
}
