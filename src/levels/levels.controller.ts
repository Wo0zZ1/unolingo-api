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

import { LevelsService } from './levels.service'

import { CreateLevelDto, UpdateLevelDto } from './dto'
import { Level } from './entities'

@Controller('levels')
export class LevelsController {
	constructor(private readonly levelsService: LevelsService) {}

	logger = new Logger()

	@Post()
	async createLevel(@Body() createLevelDto: CreateLevelDto) {
		this.logger.log('levels createLevel')

		return await this.levelsService.create(createLevelDto)
	}

	@Get()
	async getLevels(): Promise<Level[]> {
		this.logger.log('levels getLevels')

		return await this.levelsService.getAll()
	}

	@Get('/section/:sectionId')
	async getLevelsBySectionId(
		@Param('sectionId', ParseIntPipe) sectionId: number,
	): Promise<Level[]> {
		this.logger.log('levels/section/:sectionId getLevelsBySectionId')

		return await this.levelsService.getBySectionId(sectionId)
	}

	@Get('/section/:sectionId/:order')
	async getLevelBySectionIdAndOrder(
		@Param('sectionId', ParseIntPipe) sectionId: number,
		@Param('sectionId', ParseIntPipe) order: number,
	): Promise<Level> {
		this.logger.log('levels/section/:sectionId/:order getLevelBySectionIdAndOrder')

		const level = await this.levelsService.getBySectionIdAndOrder(sectionId, order)
		if (!level) throw new NotFoundException()
		return level
	}

	@Get(':id')
	async getLevelById(@Param('id', ParseIntPipe) id: number): Promise<Level> {
		this.logger.log('levels/:id getLevelById')

		const level = await this.levelsService.getById(id)
		if (!level) throw new NotFoundException()
		return level
	}

	@Patch(':id')
	async updateLevel(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateLevelDto: UpdateLevelDto,
	): Promise<Level> {
		this.logger.log('levels/:id updateLevel')

		return await this.levelsService.updateById(id, updateLevelDto)
	}

	@Patch('/section/:sectionId/:order')
	async updateLevelBySectionIdAndOrder(
		@Param('sectionId', ParseIntPipe) sectionId: number,
		@Param('sectionId', ParseIntPipe) order: number,
		@Body() updateLevelDto: UpdateLevelDto,
	): Promise<Level> {
		this.logger.log('levels/section/:sectionId/:order updateLevelBySectionIdAndOrder')

		return await this.levelsService.updateBySectionIdAndOrder(sectionId, order, updateLevelDto)
	}

	@Delete(':id')
	async deleteLevel(@Param('id', ParseIntPipe) id: number): Promise<Level> {
		this.logger.log('levels/:id deleteLevel')

		return await this.levelsService.deleteById(id)
	}

	@Delete('/section/:sectionId/:order')
	async deleteLevelBySectionIdAndOrder(
		@Param('sectionId', ParseIntPipe) sectionId: number,
		@Param('sectionId', ParseIntPipe) order: number,
	): Promise<Level> {
		this.logger.log('levels/section/:sectionId/:order deleteLevelBySectionIdAndOrder')

		return await this.levelsService.deleteBySectionIdAndOrder(sectionId, order)
	}
}
