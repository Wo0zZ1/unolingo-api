import { IsIn, IsOptional, IsString } from 'class-validator'

import { LanguageCode } from '../entities/language.entity'

export class UpdateLanguageDto {
	@IsOptional()
	@IsString()
	name?: string

	@IsOptional()
	@IsIn(['RU', 'EN', 'DE', 'FR', 'ES'])
	sourceLang?: LanguageCode

	@IsOptional()
	@IsIn(['RU', 'EN', 'DE', 'FR', 'ES'])
	targetLang?: LanguageCode

	@IsOptional()
	@IsString()
	flagIcon?: string
}
