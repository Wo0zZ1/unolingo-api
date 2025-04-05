import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'

import { CreateProgressDto } from './dto'
import { Progress } from './entities'

@Injectable()
export class ProgressService {
	constructor(private readonly prisma: PrismaService) {}

	async createProgress(createProgressDto: CreateProgressDto): Promise<Progress> {
		console.log(createProgressDto)

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

	// async completeLevel(userId: number, dto: CompleteLevelDto) {
	//   return this.prisma.$transaction(async (tx) => {
	//     // 1. Отметка о прохождении уровня
	//     await tx.userProgress.upsert({
	//       where: { userId_levelId: { userId, levelId: dto.levelId } },
	//       update: {
	//         completed: true,
	//         attempts: { increment: 1 },
	//         bestTime: {
	//           set: Math.min(current?.bestTime || Infinity, dto.timeSpent)
	//         }
	//       },
	//       create: {
	//         userId,
	//         levelId: dto.levelId,
	//         completed: true,
	//         bestTime: dto.timeSpent
	//       }
	//     });

	//     // 2. Расчет опыта
	//     const exp = this.calculateExperience(dto);

	//     // 3. Обновление статистики
	//     const updatedStats = await tx.userStats.update({
	//       where: { userId },
	//       data: {
	//         currentExp: { increment: exp },
	//         totalExp: { increment: exp },
	//         lastActive: new Date(),
	//         streakDays: this.calculateStreak(userId) // Логика подсчета дней подряд
	//       }
	//     });

	//     // 4. Проверка повышения уровня
	//     const levelUp = await this.checkLevelUp(userId, updatedStats);

	//     return { exp, levelUp };
	//   });
	// }

	// private calculateExperience(dto: CompleteLevelDto): number {
	//   const baseExp = 100; // Базовый опыт за уровень
	//   let multiplier = 1.0;

	//   // Модификаторы
	//   if (dto.firstAttempt) multiplier += 0.3;
	//   if (dto.mistakesCount === 0) multiplier += 0.2;
	//   if (dto.hintsUsed === 0) multiplier += 0.1;
	//   if (dto.timeSpent < 120) multiplier += 0.4; // Быстрое прохождение

	//   return Math.round(baseExp * multiplier);
	// }

	// private async checkLevelUp(userId: number, stats: UserStats) {
	//   const expToNextLevel = this.getExpForLevel(stats.level + 1);

	//   if (stats.currentExp >= expToNextLevel) {
	//     await this.prisma.userStats.update({
	//       where: { userId },
	//       data: {
	//         level: { increment: 1 },
	//         currentExp: { decrement: expToNextLevel }
	//       }
	//     });

	//     return { newLevel: stats.level + 1 };
	//   }
	//   return null;
	// }

	// @Post('/experience')
	// @UseGuards(AuthGuard)
	// async updateStat(
	// 	@CurrentUser() userPayload: IUserJwtPayload,
	// 	@Body() updateStatDto: UpdateStatDto,
	// ) {
	// 	this.logger.log('stats/experience updateStat')

	// 	return await this.statsService.updateStatByUserId(userPayload.id, updateStatDto)
	// }

	// // TODO IMPLEMENT
	// private calculateExp(level: number) {
	// 	return 100 * Math.pow(1.2, level - 1)
	// }
}
