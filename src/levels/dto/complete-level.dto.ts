import { IsNumber } from 'class-validator'

export class CompleteLevelDto {
	@IsNumber()
	levelGlobalOrder!: number

	@IsNumber()
	errors!: number

	@IsNumber()
	time!: number
}
