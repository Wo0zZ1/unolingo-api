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

import { TheoryService } from './theory.service'

import { CreateTheoryDto, UpdateTheoryDto } from './dto'

@Controller('theory')
export class TheoryController {
	constructor(private readonly theoryService: TheoryService) {}

	logger = new Logger()

	@Post()
	async createTheory(@Body() createTheoryDto: CreateTheoryDto) {
		this.logger.log('theory createTheory')

		return await this.theoryService.create(createTheoryDto)
	}

	@Get()
	async getTheorys() {
		this.logger.log('theory getTheorys')

		return await this.theoryService.getAll()
	}

	@Get(':id')
	async getTheoryById(@Param('id', ParseIntPipe) id: number) {
		this.logger.log('theory/:id getTheoryById')

		const theory = await this.theoryService.getById(id)
		if (!theory) throw new NotFoundException()
		return theory
	}

	@Get('/section/:sectionId')
	async getTheoryBySectionId(@Param('id', ParseIntPipe) sectionId: number) {
		this.logger.log('theory/section/:sectionId getTheoryBySectionId')

		const theory = await this.theoryService.getBySectionId(sectionId)
		if (!theory) throw new NotFoundException()
		return theory
	}

	@Patch(':id')
	async updateTheoryById(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateTheoryDto: UpdateTheoryDto,
	) {
		this.logger.log('theory/:id updateTheoryById')

		return await this.theoryService.updateById(id, updateTheoryDto)
	}

	@Patch('/section/:sectionId')
	async updateTheoryBySectionId(
		@Param('sectionId', ParseIntPipe) sectionId: number,
		@Body() updateTheoryDto: UpdateTheoryDto,
	) {
		this.logger.log('theory/section/:sectionId updateTheoryBySectionId')

		return await this.theoryService.updateBySectionId(sectionId, updateTheoryDto)
	}

	@Delete(':id')
	async deleteTheoryById(@Param('id', ParseIntPipe) id: number) {
		this.logger.log('theory/:id deleteTheoryById')

		return await this.theoryService.deleteById(id)
	}

	@Delete('/section/:sectionId')
	async deleteTheoryBySectionId(@Param('sectionId', ParseIntPipe) sectionId: number) {
		this.logger.log('theory/section/:sectionId deleteTheoryBySectionId')

		return await this.theoryService.deleteBySectionId(sectionId)
	}
}
