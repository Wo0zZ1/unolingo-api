import { IsDateString, IsIn, IsNumber, IsString } from 'class-validator'
import { LanguageCode } from 'src/languages/entities'

export class User {
	@IsNumber()
	id!: number

	@IsString()
	username!: string

	@IsString()
	password!: string

	@IsIn(['RU', 'EN', 'DE', 'FR', 'ES'])
	language!: LanguageCode

	@IsDateString()
	createdAt!: Date

	@IsDateString()
	updatedAt!: Date
}
