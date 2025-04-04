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

import { UsersService } from './users.service'
import { AuthGuard } from 'src/auth/auth.guard'
import { UpdateUserDto } from './dto'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	logger = new Logger()

	@Get()
	@UseGuards(AuthGuard)
	findAll() {
		this.logger.log('get users')
		return this.usersService.getUsers()
	}

	@Get(':id')
	@UseGuards(AuthGuard)
	findOne(@Param('id', ParseIntPipe) id: number) {
		this.logger.log('get users:id')
		return this.usersService.getUserById(id)
	}

	@Patch(':id')
	@UseGuards(AuthGuard)
	update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
		this.logger.log('patch users:id')
		return this.usersService.updateUser(id, updateUserDto)
	}

	@Delete(':id')
	@UseGuards(AuthGuard)
	remove(@Param('id', ParseIntPipe) id: number) {
		this.logger.log('delete users:id')
		return this.usersService.deleteUser(id)
	}
}
