import { Controller, Get, Param, ParseIntPipe, Post, Logger, UseGuards } from '@nestjs/common'

import { CurrentUser, IUserJwtPayload } from 'src/users/current-user.decorator'
import { ProgressService } from './progress.service'

import { AuthGuard } from 'src/auth/auth.guard'

@Controller('progress')
export class ProgressController {
	constructor(private readonly progressService: ProgressService) {}

	logger = new Logger()

	@Post(':languageId')
	@UseGuards(AuthGuard)
	async createProgress(
		@CurrentUser() userPayload: IUserJwtPayload,
		@Param('languageId', ParseIntPipe) languageId: number,
	) {
		this.logger.log('progress createProgress')

		return await this.progressService.createProgress({
			userId: userPayload.id,
			languageId: languageId,
		})
	}

	@Get()
	@UseGuards(AuthGuard)
	async getProgresses(@CurrentUser() userPayload: IUserJwtPayload) {
		this.logger.log('progress getProgresses')

		return await this.progressService.getProgresses(userPayload.id)
	}

	@Get(':languageId')
	@UseGuards(AuthGuard)
	async getProgressByLanguageId(
		@CurrentUser() userPayload: IUserJwtPayload,
		@Param('languageId', ParseIntPipe) languageId: number,
	) {
		this.logger.log('progress/:languageId getProgressByLanguageId')

		return await this.progressService.getProgress(userPayload.id, languageId)
	}
}
