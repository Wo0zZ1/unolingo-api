import { IsNumber, IsIn, IsString, IsOptional } from 'class-validator'

import { TTaskType } from '../entities'

export class UpdateTaskDto {
	@IsOptional()
	@IsNumber()
	order?: number

	@IsOptional()
	@IsNumber()
	levelId?: number

	@IsOptional()
	@IsIn(['WORD_PICKER', 'TEXT_INPUT'])
	type?: TTaskType

	@IsOptional()
	@IsString()
	question?: string

	@IsOptional()
	@IsString()
	correctAnswer?: string

	@IsOptional()
	@IsString({ each: true })
	partialAnswer?: string[]

	@IsOptional()
	@IsString({ each: true })
	options?: string[]
}
