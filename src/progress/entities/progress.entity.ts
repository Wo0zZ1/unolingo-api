import { IsDateString, IsNumber } from 'class-validator'

export class Progress {
	@IsNumber()
	id!: number

	@IsNumber()
	userId!: number

	@IsNumber()
	languageId!: number

	@IsNumber()
	lastUnlockedLevel!: number

	@IsDateString()
	createdAt!: Date

	@IsDateString()
	updatedAt!: Date
}
