import {
	Controller,
	Get,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	ParseIntPipe,
} from '@nestjs/common'

import { UsersService } from './users.service'
import { AuthGuard } from 'src/auth/auth.guard'
import { UpdateUserDto } from './dto'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	@UseGuards(AuthGuard)
	findAll() {
		return this.usersService.getUsers()
	}

	@Get(':id')
	@UseGuards(AuthGuard)
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.getUserById(id)
	}

	@Patch(':id')
	@UseGuards(AuthGuard)
	update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.updateUser(id, updateUserDto)
	}

	@Delete(':id')
	@UseGuards(AuthGuard)
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.deleteUser(id)
	}
}
