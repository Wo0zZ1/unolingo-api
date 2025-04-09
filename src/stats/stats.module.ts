import { Module } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'

import { StatsService } from './stats.service'
import { StatsController } from './stats.controller'

@Module({
	controllers: [StatsController],
	providers: [PrismaService, StatsService],
	exports: [StatsService],
})
export class StatsModule {}
