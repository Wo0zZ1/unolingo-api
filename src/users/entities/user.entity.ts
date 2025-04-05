import { IsDateString, IsNumber, IsString } from 'class-validator'

export class User {
	@IsNumber()
	id: number

	@IsString()
	username: string

	@IsString()
	password: string

	@IsDateString()
	createdAt: Date

	@IsDateString()
	updatedAt: Date
}
