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

	async getUserLastLanguageId(id: number): Promise<{ lastLanguageCourseId: number | null }> {
		const lastLanguageCourseId = (await this.prisma.user.findUnique({
			where: { id },
			select: { lastLanguageCourseId: true },
		})) ?? { lastLanguageCourseId: null }
		return lastLanguageCourseId
	}

	async userSubscribeToLanguage(userId: number, languageId: number): Promise<number> {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [_, lastLanguageCourse] = await this.prisma.$transaction([
			this.prisma.userProgress.create({
				data: {
					userId: userId,
					languageId: languageId,
				},
			}),
			this.prisma.user.update({
				where: { id: userId },
				data: { lastLanguageCourseId: languageId },
			}),
		])

		return lastLanguageCourse.id
	}

	async userUnsubscribeToLanguage(userId: number, languageId: number): Promise<void> {
		await this.prisma.userProgress.delete({ where: { userId_languageId: { userId, languageId } } })
	}

	async setUserLastLanguageId(
		id: number,
		languageId: number,
	): Promise<{ lastLanguageId: number | null }> {
		try {
			const lastLanguage = await this.prisma.user.update({
				where: { id },
				data: { lastLanguageCourseId: languageId },
			})
			return { lastLanguageId: lastLanguage.lastLanguageCourseId }
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
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

	async updateUserById(id: number, updateUserDto: UpdateUserDto): Promise<Omit<User, 'password'>> {
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

	async deleteUserById(id: number): Promise<Omit<User, 'password'>> {
		try {
			return await this.prisma.user.delete({ where: { id }, omit: { password: true } })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
				throw new NotFoundException()
			throw error
		}
	}
}
