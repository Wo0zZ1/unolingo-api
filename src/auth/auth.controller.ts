import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'

import { AuthService } from './auth.service'
import { CreateUserDto } from 'src/users/dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(HttpStatus.CREATED)
	@Post('register')
	register(@Body() registerDto: CreateUserDto) {
		return this.authService.register(registerDto.username, registerDto.password)
	}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	login(@Body() loginDto: CreateUserDto) {
		return this.authService.login(loginDto.username, loginDto.password)
	}
}
