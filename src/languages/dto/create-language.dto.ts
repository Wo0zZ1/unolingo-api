import { IsIn, IsString } from 'class-validator'

import { LanguageCode } from '../entities/language.entity'

export class CreateLanguageDto {
	@IsString()
	name: string

	@IsIn(['RU', 'EN', 'DE', 'FR', 'ES'])
	sourceLang: LanguageCode

	@IsIn(['RU', 'EN', 'DE', 'FR', 'ES'])
	targetLang: LanguageCode

	@IsString()
	flagIcon: string
}
