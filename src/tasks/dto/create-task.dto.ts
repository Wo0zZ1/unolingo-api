import { IsNumber, IsIn, IsString } from 'class-validator'

import { TTaskType } from '../entities/task.entity'

export class CreateTaskDto {
	@IsNumber()
	order: number

	@IsNumber()
	levelId: number

	@IsIn(['WORD_PICKER', 'TEXT_INPUT'])
	type: TTaskType

	@IsString()
	question: string

	@IsString()
	correctAnswer: string

	@IsString({ each: true })
	partialAnswer: string[]

	@IsString({ each: true })
	options: string[]
}
