import { Module } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'
import { LevelsService } from './levels.service'

import { LevelsController } from './levels.controller'
import { UsersModule } from 'src/users/users.module'
import { StatsModule } from 'src/stats/stats.module'
import { SectionsModule } from 'src/sections/sections.module'
import { ProgressModule } from 'src/progress/progress.module'

@Module({
	imports: [UsersModule, StatsModule, SectionsModule, ProgressModule],
	controllers: [LevelsController],
	providers: [PrismaService, LevelsService],
})
export class LevelsModule {}
