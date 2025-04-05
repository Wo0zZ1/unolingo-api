import { Controller, Get, Logger, UseGuards } from '@nestjs/common'

import { StatsService } from './stats.service'

import { CurrentUser, IUserJwtPayload } from 'src/users/current-user.decorator'
import { AuthGuard } from 'src/auth/auth.guard'

@Controller('stats')
export class StatsController {
	constructor(private readonly statsService: StatsService) {}

	logger = new Logger()

	@Get()
	@UseGuards(AuthGuard)
	async getStats(@CurrentUser() userPayload: IUserJwtPayload) {
		this.logger.log('stats getStats')

		return await this.statsService.getStatsByUserId(userPayload.id)
	}

	@Get('/leaderboard')
	async getLeaderBoard() {
		this.logger.log('stats getLeaderBoard')

		return await this.statsService.getLeaderBoard()
	}
}
