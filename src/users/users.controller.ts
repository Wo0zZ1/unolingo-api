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
} from '@nestjs/common'

import { AuthGuard } from 'src/auth/auth.guard'

import { UsersService } from './users.service'

import { UpdateUserDto } from './dto'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	logger = new Logger()

	@Get()
	@UseGuards(AuthGuard)
	getUsers() {
		this.logger.log('users getUsers')

		return this.usersService.getUsers()
	}

	@Get(':id')
	@UseGuards(AuthGuard)
	getUserById(@Param('id', ParseIntPipe) id: number) {
		this.logger.log('users/:id getUserById')

		return this.usersService.getUserById(id)
	}

	@Patch(':id')
	@UseGuards(AuthGuard)
	updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
		this.logger.log('users/:id updateUser')

		return this.usersService.updateUserById(id, updateUserDto)
	}

	@Delete(':id')
	@UseGuards(AuthGuard)
	deleteUser(@Param('id', ParseIntPipe) id: number) {
		this.logger.log('users/:id deleteUser')

		return this.usersService.deleteUserById(id)
	}
}
