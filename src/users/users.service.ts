import * as bcrypt from 'bcrypt'
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Prisma } from '@prisma/client'

import { PrismaService } from 'src/prisma.service'
import { CreateUserDto, UpdateUserDto } from './dto'
import { User } from './entities'

@Injectable()
export class UsersService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly configService: ConfigService,
	) {}

	async createUser(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
		try {
			const hashPassword = await bcrypt.hash(
				createUserDto.password,
				+this.configService.getOrThrow<string>('SALT'),
			)

			const user = await this.prisma.user.create({
				data: { ...createUserDto, password: hashPassword, userStat: { create: {} } },
				omit: { password: true },
			})

			return user
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002')
				throw new ConflictException()

			throw error
		}
	}

	async getUsers(): Promise<Omit<User, 'password'>[]> {
		return await this.prisma.user.findMany({ omit: { password: true } })
	}

	async getUserById(id: number): Promise<Omit<User, 'password'>> {
		try {
			return await this.prisma.user.findUniqueOrThrow({ where: { id }, omit: { password: true } })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
				throw new NotFoundException()
			throw error
		}
	}

	async getUserByUsername(username: string): Promise<User> {
		try {
			return await this.prisma.user.findUniqueOrThrow({ where: { username } })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
				throw new NotFoundException()
			throw error
		}
	}

	async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<Omit<User, 'password'>> {
		try {
			return await this.prisma.user.update({
				data: updateUserDto,
				where: { id },
				omit: { password: true },
			})
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async deleteUser(id: number): Promise<Omit<User, 'password'>> {
		try {
			return await this.prisma.user.delete({ where: { id }, omit: { password: true } })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
				throw new NotFoundException()
			throw error
		}
	}
}
