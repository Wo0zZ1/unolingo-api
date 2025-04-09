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
	UseGuards,
	UnauthorizedException,
} from '@nestjs/common'

import { StatsService } from 'src/stats/stats.service'
import { LevelsService } from './levels.service'
import { UsersService } from 'src/users/users.service'

import { CompleteLevelDto, UpdateLevelDto } from './dto'
import { Level } from './entities'
import { AuthGuard } from 'src/auth/auth.guard'
import { CurrentUser, IUserJwtPayload } from 'src/users/current-user.decorator'
import { SectionsService } from 'src/sections/sections.service'
import { ProgressService } from 'src/progress/progress.service'

@Controller('levels')
export class LevelsController {
	constructor(
		private readonly statsService: StatsService,
		private readonly userService: UsersService,
		private readonly progressService: ProgressService,
		private readonly levelsService: LevelsService,
		private readonly sectionsService: SectionsService,
	) {}

	logger = new Logger()

	@Post('complete/:levelId')
	@UseGuards(AuthGuard)
	async levelComplete(
		@CurrentUser() userPayload: IUserJwtPayload,
		@Param('levelId', ParseIntPipe) levelId: number,
		@Body() completeLevelDto: CompleteLevelDto,
	) {
		this.logger.log('complete/:levelId levelComplete')

		const [section, level, user, userStat] = await Promise.all([
			this.sectionsService.getByLevelId(levelId),
			this.levelsService.getById(levelId),
			this.userService.getUserById(userPayload.id),
			this.statsService.getStatByUserId(userPayload.id),
		])

		if (!user) throw new UnauthorizedException()
		if (!section || !level || !userStat) throw new NotFoundException()

		const experience = this.calculateExperience(section.order, level.order, completeLevelDto)
		const newUserStat = await this.statsService.levelComplete(user.id, experience)
		await this.progressService.levelComplete(
			section.order,
			level.order,
			user.id,
			section.languageId,
		)
		return {
			experience: experience,
			experienceToNextLevel: newUserStat.experienceToNextLevel,
			levelUp: userStat.level < newUserStat.level,
		}
	}

	@Post('/section/:sectionId/:order')
	async createLevel(
		@Param('sectionId', ParseIntPipe) sectionId: number,
		@Param('order', ParseIntPipe) order: number,
	) {
		this.logger.log('levels createLevel')

		return await this.levelsService.create(sectionId, order)
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
		@Param('order', ParseIntPipe) order: number,
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
		@Param('order', ParseIntPipe) order: number,
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
		@Param('order', ParseIntPipe) order: number,
	): Promise<Level> {
		this.logger.log('levels/section/:sectionId/:order deleteLevelBySectionIdAndOrder')

		return await this.levelsService.deleteBySectionIdAndOrder(sectionId, order)
	}

	calculateExperience(
		sectionOrder: number,
		levelOrder: number,
		completeLevelDto: CompleteLevelDto,
	) {
		// Базовые константы
		const BASE_EXP = 100
		const IDEAL_TIME = 90 // 1,5 минуты (худший случай)
		const MAX_TIME_PENALTY = 0.4 // Макс. штраф за ошибки (50%)
		const MAX_ERROR_PENALTY = 0.5 // Макс. штраф за ошибки (50%)
		const LEVEL_MULTIPLIER = 1 + ((sectionOrder - 1) * 5 + levelOrder) * 0.05 // +5% за каждый уровень

		// Коэффициенты
		const timeFactor = Math.max(MAX_TIME_PENALTY, 1 - completeLevelDto.time / IDEAL_TIME)
		const errorFactor = 1 - Math.min(MAX_ERROR_PENALTY, completeLevelDto.errors * 0.05)

		// Итоговый расчет
		return Math.round(BASE_EXP * timeFactor * errorFactor * LEVEL_MULTIPLIER)
	}
}
