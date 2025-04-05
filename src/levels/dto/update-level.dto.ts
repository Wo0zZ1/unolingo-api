import { IsNumber, IsOptional } from 'class-validator'

export class UpdateLevelDto {
	@IsOptional()
	@IsNumber()
	order?: number

	@IsOptional()
	@IsNumber()
	sectionId?: number
}
