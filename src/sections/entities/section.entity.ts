import { IsDateString, IsNumber, IsString } from 'class-validator'

export class Section {
	@IsNumber()
	id: number

	@IsNumber()
	order: number

	@IsString()
	name: string

	@IsNumber()
	languageId: number

	@IsDateString()
	createdAt: Date

	@IsDateString()
	updatedAt: Date
}
