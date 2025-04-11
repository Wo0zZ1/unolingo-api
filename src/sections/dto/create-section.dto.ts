import { IsNumber, IsString } from 'class-validator'

export class CreateSectionDtoWithoutLanguageIdAndOrder {
	@IsString()
	name!: string
}

export class CreateSectionDto extends CreateSectionDtoWithoutLanguageIdAndOrder {
	@IsNumber()
	languageId!: number

	@IsNumber()
	order!: number
}
