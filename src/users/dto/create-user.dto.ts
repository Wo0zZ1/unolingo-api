import { IsIn, IsString } from 'class-validator'

import { LanguageCode } from 'src/languages/entities'

export class CreateUserDto {
	@IsString()
	username: string

	@IsString()
	password: string

	@IsIn(['RU', 'EN', 'DE', 'FR', 'ES'])
	language: LanguageCode
}

export class LoginUserDto {
	@IsString()
	username: string

	@IsString()
	password: string
}
