import { IsNumber } from 'class-validator'

export class CreateProgressDto {
	@IsNumber()
	userId!: number

	@IsNumber()
	languageId!: number
}
