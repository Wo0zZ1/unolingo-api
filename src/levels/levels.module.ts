import { Module } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'

import { LevelsService } from './levels.service'
import { LevelsController } from './levels.controller'

@Module({
	controllers: [LevelsController],
	providers: [PrismaService, LevelsService],
})
export class LevelsModule {}
