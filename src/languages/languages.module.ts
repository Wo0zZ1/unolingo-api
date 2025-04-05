import { Module } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'

import { LanguagesService } from './languages.service'
import { LanguagesController } from './languages.controller'

@Module({
	controllers: [LanguagesController],
	providers: [PrismaService, LanguagesService],
})
export class LanguagesModule {}
