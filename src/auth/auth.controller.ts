import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Logger,
	Post,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common'
import { Request, Response } from 'express'

import { AuthService } from './auth.service'

import { AuthGuard } from './auth.guard'
import { RefreshTokenGuard } from './refresh-token.guard'

import { CreateUserDto, LoginUserDto } from 'src/users/dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	logger = new Logger()

	@HttpCode(HttpStatus.CREATED)
	@Post('register')
	async register(@Body() registerDto: CreateUserDto) {
		this.logger.log('auth/register register')

		return await this.authService.register(
			registerDto.username,
			registerDto.password,
			registerDto.language,
		)
	}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	async login(@Body() loginDto: LoginUserDto, @Res() response: Response) {
		this.logger.log('auth/login login')

		const { accessToken } = await this.authService.login(
			loginDto.username,
			loginDto.password,
			response,
		)
		response.json({ accessToken })
	}

	@HttpCode(HttpStatus.OK)
	@Post('refresh')
	@UseGuards(RefreshTokenGuard)
	async refresh(@Req() request: Request, @Res() response: Response) {
		this.logger.log('auth/refresh refresh')

		const { accessToken } = await this.authService.refreshTokens(
			request.cookies.refreshToken,
			response,
		)

		response.json({ accessToken })
	}

	@Post('logout')
	@UseGuards(RefreshTokenGuard)
	logout(@Res() response: Response) {
		this.logger.log('auth/logout logout')

		this.authService.logout(response)
		response.sendStatus(HttpStatus.OK)
	}

	@HttpCode(HttpStatus.OK)
	@Post('check')
	@UseGuards(AuthGuard)
	checkAuth() {
		this.logger.log('auth/check checkAuth')

		return { status: 'authenticated' }
	}
}
