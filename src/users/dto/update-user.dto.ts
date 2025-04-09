import { IsIn, IsString } from 'class-validator'

import { LanguageCode } from 'src/languages/entities'

export class UpdateUserDto {
	@IsString()
	username?: string

	@IsString()
	password?: string

	@IsIn(['RU', 'EN', 'DE', 'FR', 'ES'])
	language?: LanguageCode
}
