import { Body, Controller, HttpCode, HttpStatus, Logger, Post, UseGuards } from '@nestjs/common'

import { AuthService } from './auth.service'
import { CreateUserDto } from 'src/users/dto'
import { AuthGuard } from './auth.guard'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	logger = new Logger()

	@HttpCode(HttpStatus.CREATED)
	@Post('register')
	register(@Body() registerDto: CreateUserDto) {
		this.logger.log('register')
		return this.authService.register(registerDto.username, registerDto.password)
	}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	login(@Body() loginDto: CreateUserDto) {
		this.logger.log('login')
		return this.authService.login(loginDto.username, loginDto.password)
	}

	@HttpCode(HttpStatus.OK)
	@Post('check')
	@UseGuards(AuthGuard)
	cheackAuth() {
		this.logger.log('check')
	}
}
