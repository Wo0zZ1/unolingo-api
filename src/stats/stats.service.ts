import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'

import { Stat } from './entities/stat.entity'
import { ILeaderBoardData } from './types'

@Injectable()
export class StatsService {
	constructor(private readonly prisma: PrismaService) {}

	async resetByUserId(userId: number): Promise<Stat> {
		const userStat = await this.prisma.userStat.update({
			where: { userId },
			data: {
				currentExp: 0,
				totalExp: 0,
				level: 1,
				streakDays: 0,
				lastActive: new Date(),
			},
		})

		return { ...userStat, experienceToNextLevel: this.EXP_FORMULA(1) }
	}

	async getAllStats(): Promise<Omit<Stat, 'experienceToNextLevel'>[]> {
		return await this.prisma.userStat.findMany()
	}

	async getStatByUserId(userId: number): Promise<Stat | null> {
		const statFromDB = await this.prisma.userStat.findUnique({ where: { userId } })
		if (!statFromDB) return null
		return { ...statFromDB, experienceToNextLevel: this.EXP_FORMULA(statFromDB.level) }
	}

	async getStatById(id: number): Promise<Stat | null> {
		const statFromDB = await this.prisma.userStat.findUnique({ where: { id } })
		if (!statFromDB) return null
		return { ...statFromDB, experienceToNextLevel: this.EXP_FORMULA(statFromDB.level) }
	}

	async getLeaderBoard(): Promise<ILeaderBoardData[]> {
		const response = await this.prisma.userStat.findMany({
			include: { user: { select: { username: true } } },
			orderBy: { totalExp: 'desc' },
		})
		return response.map<ILeaderBoardData>(userStat => {
			const {
				user: { username },
				...stat
			} = userStat
			return {
				username: username,
				...stat,
			}
		})
	}

	async levelComplete(userId: number, experience: number): Promise<Stat> {
		const oldStat = await this.getStatByUserId(userId)

		if (!oldStat) throw new NotFoundException()

		const startOfToday = new Date()
		startOfToday.setHours(0, 0, 0, 0)

		let currentExperience: number = oldStat.currentExp + experience
		let currentLevel: number = oldStat.level
		let exp_needed = oldStat.experienceToNextLevel

		while (currentExperience >= exp_needed) {
			currentLevel++
			currentExperience -= exp_needed
			exp_needed = this.EXP_FORMULA(currentLevel)
		}

		const newStat = await this.prisma.userStat.update({
			where: { userId },
			data: {
				currentExp: currentExperience,
				level: currentLevel,
				streakDays: { increment: oldStat.lastActive < startOfToday ? 1 : 0 },
				lastActive: new Date(),
				totalExp: { increment: experience },
			},
		})

		return { ...newStat, experienceToNextLevel: this.EXP_FORMULA(newStat.level) }
	}

	private EXP_FORMULA = level => 50 * Math.pow(1.2, level - 1)
}
