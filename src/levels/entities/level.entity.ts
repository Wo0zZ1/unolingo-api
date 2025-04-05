import { IsDateString, IsNumber } from 'class-validator'

export class Level {
	@IsNumber()
	id: number

	@IsNumber()
	order: number

	@IsNumber()
	sectionId: number

	@IsDateString()
	createdAt: Date

	@IsDateString()
	updatedAt: Date
}
