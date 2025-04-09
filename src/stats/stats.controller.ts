import { Controller, Get, Logger, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common'

import { StatsService } from './stats.service'

import { CurrentUser, IUserJwtPayload } from 'src/users/current-user.decorator'
import { AuthGuard } from 'src/auth/auth.guard'

@Controller('stats')
export class StatsController {
	constructor(private readonly statsService: StatsService) {}

	logger = new Logger()

	@Get()
	async getAll() {
		this.logger.log('stats getAll')

		return await this.statsService.getAllStats()
	}

	@Get('me')
	@UseGuards(AuthGuard)
	async getMyStats(@CurrentUser() userPayload: IUserJwtPayload) {
		this.logger.log('stats/me getMyStats')

		return await this.statsService.getStatByUserId(userPayload.id)
	}

	@Post('me/reset')
	@UseGuards(AuthGuard)
	async reset(@CurrentUser() userPayload: IUserJwtPayload) {
		this.logger.log('stats/me/reset reset')

		return await this.statsService.resetByUserId(userPayload.id)
	}

	@Get('leaderboard')
	async getLeaderBoard() {
		this.logger.log('stats getLeaderBoard')

		return await this.statsService.getLeaderBoard()
	}

	@Get(':id')
	async getStatsById(@Query('id', ParseIntPipe) id: number) {
		this.logger.log('stats getStatsById')

		return await this.statsService.getStatByUserId(id)
	}
}
