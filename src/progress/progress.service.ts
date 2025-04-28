import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'

import { CreateProgressDto } from './dto'
import { Progress } from './entities'

@Injectable()
export class ProgressService {
	constructor(private readonly prisma: PrismaService) {}

	async createProgress(createProgressDto: CreateProgressDto): Promise<Progress> {
		return await this.prisma.userProgress.create({
			data: {
				userId: createProgressDto.userId,
				languageId: createProgressDto.languageId,
			},
		})
	}

	async getProgresses(userId: number): Promise<Progress[]> {
		return await this.prisma.userProgress.findMany({ where: { userId } })
	}

	async getProgress(userId: number, languageId: number): Promise<Progress | null> {
		return await this.prisma.userProgress.findUnique({
			where: { userId_languageId: { userId, languageId } },
		})
	}

	async levelComplete(
		sectionOrder: number,
		levelOrder: number,
		userId: number,
		languageId: number,
	): Promise<boolean> {
		const oldUserProgress = await this.getProgress(userId, languageId)
		if (!oldUserProgress) return false
		const lastLevel = (sectionOrder - 1) * 5 + levelOrder === oldUserProgress.lastUnlockedLevel
		await this.prisma.userProgress.update({
			where: { userId_languageId: { userId, languageId } },
			data: {
				lastUnlockedLevel: {
					increment: lastLevel ? 1 : 0,
				},
			},
		})
		return lastLevel
	}
}
