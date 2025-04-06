import { IsNumber, IsString } from 'class-validator'

export class CreateSectionDtoWithoutLanguageId {
	@IsNumber()
	order: number

	@IsString()
	name: string
}

export class CreateSectionDto extends CreateSectionDtoWithoutLanguageId {
	@IsNumber()
	languageId: number
}
