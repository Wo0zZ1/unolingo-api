import { IsDateString, IsIn, IsNumber, IsString } from 'class-validator'

export type TTaskType = 'WORD_PICKER' | 'TEXT_INPUT'

export class Task {
	@IsNumber()
	id!: number

	@IsNumber()
	order!: number

	@IsNumber()
	levelId!: number

	@IsIn(['WORD_PICKER', 'TEXT_INPUT'])
	type!: TTaskType

	@IsString()
	question!: string

	@IsString()
	correctAnswer!: string

	@IsString({ each: true })
	partialAnswer!: string[]

	@IsString({ each: true })
	options!: string[]

	@IsDateString()
	createdAt!: Date

	@IsDateString()
	updatedAt!: Date
}
