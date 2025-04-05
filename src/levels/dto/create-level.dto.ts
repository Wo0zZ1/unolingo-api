import { IsNumber } from 'class-validator'

export class CreateLevelDto {
	@IsNumber()
	order: number

	@IsNumber()
	sectionId: number
}
