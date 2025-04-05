import { Module } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'

import { SectionsService } from './sections.service'
import { SectionsController } from './sections.controller'

@Module({
	controllers: [SectionsController],
	providers: [PrismaService, SectionsService],
})
export class SectionsModule {}
