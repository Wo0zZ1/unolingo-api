import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Logger,
	ParseIntPipe,
	NotFoundException,
} from '@nestjs/common'

import { LanguagesService } from './languages.service'
import { CreateLanguageDto, UpdateLanguageDto } from './dto'

@Controller('languages')
export class LanguagesController {
	constructor(private readonly languagesService: LanguagesService) {}

	logger = new Logger()

	@Post()
	async createLanguage(@Body() createLanguageDto: CreateLanguageDto) {
		this.logger.log('languages createLanguage')

		return await this.languagesService.createLanguage(createLanguageDto)
	}

	@Get()
	async getLanguages() {
		this.logger.log('languages getLanguages')

		return await this.languagesService.getLanguages()
	}

	@Get(':id')
	async getLanguage(@Param('id', ParseIntPipe) id: number) {
		this.logger.log('languages/:id getLanguage')

		const language = await this.languagesService.getLanguage(id)
		if (!language) throw new NotFoundException()
		return language
	}

	@Patch(':id')
	async updateLanguage(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateLanguageDto: UpdateLanguageDto,
	) {
		this.logger.log('languages/:id updateLanguage')

		return await this.languagesService.updateLanguage(id, updateLanguageDto)
	}

	@Delete(':id')
	async deleteLanguage(@Param('id', ParseIntPipe) id: number) {
		this.logger.log('languages/:id deleteLanguage')

		return await this.languagesService.deleteLanguage(id)
	}
}
