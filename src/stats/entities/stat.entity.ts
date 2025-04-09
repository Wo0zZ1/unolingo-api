import { IsDateString, IsNumber } from 'class-validator'

export class Stat {
	@IsNumber()
	id: number

	@IsNumber()
	userId: number

	@IsNumber()
	level: number

	@IsNumber()
	currentExp: number

	@IsNumber()
	experienceToNextLevel: number

	@IsNumber()
	totalExp: number

	@IsNumber()
	streakDays: number

	@IsDateString()
	lastActive: Date
}
