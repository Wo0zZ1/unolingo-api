import { IsNumber, IsIn, IsString, IsOptional } from 'class-validator'

import { TTaskType } from '../entities/task.entity'

export class CreateTaskDtoWithoutLevelIdAndOrder {
	@IsIn(['WORD_PICKER', 'TEXT_INPUT'])
	type: TTaskType

	@IsString()
	question: string

	@IsString()
	correctAnswer: string

	@IsOptional()
	@IsString({ each: true })
	partialAnswer?: string[]

	@IsOptional()
	@IsString({ each: true })
	options?: string[]
}

export class CreateTaskDto extends CreateTaskDtoWithoutLevelIdAndOrder {
	@IsNumber()
	order: number

	@IsNumber()
	levelId: number
}
