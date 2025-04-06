import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseIntPipe,
	Logger,
	NotFoundException,
} from '@nestjs/common'

import { SectionsService } from './sections.service'

import { CreateSectionDtoWithoutLanguageIdAndOrder, UpdateSectionDto } from './dto'

@Controller('sections')
export class SectionsController {
	constructor(private readonly sectionsService: SectionsService) {}

	logger = new Logger()

	@Post('/language/:languageId/:order')
	async create(
		@Param('languageId', ParseIntPipe) languageId: number,
		@Param('order', ParseIntPipe) order: number,
		@Body() createSectionDto: CreateSectionDtoWithoutLanguageIdAndOrder,
	) {
		this.logger.log('sections/language/:languageId create')

		return await this.sectionsService.create({ ...createSectionDto, languageId, order })
	}

	@Get()
	async getAll() {
		this.logger.log('sections getAll')

		return await this.sectionsService.getAll()
	}

	@Get(':id')
	async getById(@Param('id', ParseIntPipe) id: number) {
		this.logger.log('sections/:id getById')

		const section = await this.sectionsService.getById(id)
		if (!section) throw new NotFoundException()
		return section
	}

	@Get('/language/:languageId')
	async getAllByLanguageId(@Param('languageId', ParseIntPipe) languageId: number) {
		this.logger.log('sections/language/:languageId getAllByLanguageId')

		return await this.sectionsService.getAllByLanguageId(languageId)
	}

	@Get('/language/:languageId/:order')
	async getByLanguageIdAndOrder(
		@Param('languageId', ParseIntPipe) languageId: number,
		@Param('order', ParseIntPipe) order: number,
	) {
		this.logger.log('sections/language/:languageId/:order getByLanguageIdAndOrder')

		const section = await this.sectionsService.getByLanguageIdAndOrder(languageId, order)
		if (!section) throw new NotFoundException()
		return section
	}

	@Patch(':id')
	async updateById(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateSectionDto: UpdateSectionDto,
	) {
		this.logger.log('sections/:id updateById')

		return await this.sectionsService.updateById(id, updateSectionDto)
	}

	@Patch('/language/:languageId/:order')
	async updateByLanguageIdAndOrder(
		@Param('languageId', ParseIntPipe) languageId: number,
		@Param('order', ParseIntPipe) order: number,
		@Body() updateSectionDto: UpdateSectionDto,
	) {
		this.logger.log('sections/language/:languageId/:order updateByLanguageIdAndOrder')

		return await this.sectionsService.updateByLanguageIdAndOrder(
			languageId,
			order,
			updateSectionDto,
		)
	}

	@Delete(':id')
	async deleteById(@Param('id', ParseIntPipe) id: number) {
		this.logger.log('sections/:id deleteById')

		return await this.sectionsService.deleteById(id)
	}

	@Delete('/language/:languageId/:order')
	async deleteByLanguageIdAndOrder(
		@Param('languageId', ParseIntPipe) languageId: number,
		@Param('order', ParseIntPipe) order: number,
	) {
		this.logger.log('sections/language/:languageId/:order deleteByLanguageIdAndOrder')

		return await this.sectionsService.deleteByLanguageIdAndOrder(languageId, order)
	}
}
