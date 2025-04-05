import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'

import { Stat } from './entities/stat.entity'

@Injectable()
export class StatsService {
	constructor(private readonly prisma: PrismaService) {}

	async getLeaderBoard(): Promise<Stat[]> {
		return await this.prisma.userStat.findMany({ orderBy: { totalExp: 'desc' } })
	}

	async getStatsByUserId(userId: number): Promise<Stat[]> {
		return await this.prisma.userStat.findMany({ where: { userId } })
	}

	async getStat(id: number): Promise<Stat | null> {
		return await this.prisma.userStat.findUnique({ where: { id } })
	}
}
