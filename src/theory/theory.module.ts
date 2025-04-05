import { Module } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'

import { TheoryService } from './theory.service'
import { TheoryController } from './theory.controller'

@Module({
	controllers: [TheoryController],
	providers: [PrismaService, TheoryService],
})
export class TheoryModule {}
