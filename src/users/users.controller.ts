import {
	Controller,
	Get,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	ParseIntPipe,
	Logger,
	Post,
} from '@nestjs/common'

import { AuthGuard } from 'src/auth/auth.guard'

import { UsersService } from './users.service'

import { UpdateUserDto } from './dto'
import { CurrentUser, IUserJwtPayload } from './current-user.decorator'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	logger = new Logger()

	@Post('me/last-language/:languageId')
	@UseGuards(AuthGuard)
	async setUserLastLanguageId(
		@CurrentUser() userPayload: IUserJwtPayload,
		@Param('languageId', ParseIntPipe) languageId: number,
	) {
		this.logger.log('users/me/last-language setUserLastLanguageId')

		return await this.usersService.setUserLastLanguageId(userPayload.id, languageId)
	}

	@Get('me/last-language')
	@UseGuards(AuthGuard)
	async getUserLastLanguageId(@CurrentUser() userPayload: IUserJwtPayload) {
		this.logger.log('users/me/last-language getUserLastLanguageId')

		return await this.usersService.getUserLastLanguageId(userPayload.id)
	}

	@Post('me/unsubscribe-language/:languageId')
	@UseGuards(AuthGuard)
	async userUnsubscribeToLanguage(
		@CurrentUser() userPayload: IUserJwtPayload,
		@Param('languageId', ParseIntPipe) languageId: number,
	) {
		this.logger.log('users/me/unsubscribe-language/:languageId userUnsubscribeToLanguage')

		return await this.usersService.userUnsubscribeToLanguage(userPayload.id, languageId)
	}

	@Post('me/subscribe-language/:languageId')
	@UseGuards(AuthGuard)
	async userSubscribeToLanguage(
		@CurrentUser() userPayload: IUserJwtPayload,
		@Param('languageId', ParseIntPipe) languageId: number,
	) {
		this.logger.log('users/me/subscribe-language/:languageId userSubscribeToLanguage')

		return await this.usersService.userSubscribeToLanguage(userPayload.id, languageId)
	}

	@Get()
	@UseGuards(AuthGuard)
	async getUsers() {
		this.logger.log('users getUsers')

		return await this.usersService.getUsers()
	}

	@Get('me')
	@UseGuards(AuthGuard)
	async getMe(@CurrentUser() userPayload: IUserJwtPayload) {
		this.logger.log('users/me getMe')

		return await this.usersService.getUserById(userPayload.id)
	}

	@Get(':id')
	@UseGuards(AuthGuard)
	async getUserById(@Param('id', ParseIntPipe) id: number) {
		this.logger.log('users/:id getUserById')

		return await this.usersService.getUserById(id)
	}

	@Patch(':id')
	@UseGuards(AuthGuard)
	async updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
		this.logger.log('users/:id updateUser')

		return await this.usersService.updateUserById(id, updateUserDto)
	}

	@Delete(':id')
	@UseGuards(AuthGuard)
	async deleteUser(@Param('id', ParseIntPipe) id: number) {
		this.logger.log('users/:id deleteUser')

		return await this.usersService.deleteUserById(id)
	}
}
