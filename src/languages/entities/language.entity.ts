import { IsDateString, IsIn, IsNumber, IsString } from 'class-validator'

export type LanguageCode = 'RU' | 'EN' | 'DE' | 'FR' | 'ES'

export class Language {
	@IsNumber()
	id: number

	@IsString()
	name: string

	@IsIn(['RU', 'EN', 'DE', 'FR', 'ES'])
	sourceLang: LanguageCode

	@IsIn(['RU', 'EN', 'DE', 'FR', 'ES'])
	targetLang: LanguageCode

	@IsString()
	flagIcon: string

	@IsDateString()
	createdAt: Date

	@IsDateString()
	updatedAt: Date
}
