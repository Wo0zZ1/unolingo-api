import { Module } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'

import { ProgressService } from './progress.service'
import { ProgressController } from './progress.controller'
import { UsersModule } from 'src/users/users.module'

@Module({
	imports: [UsersModule],
	controllers: [ProgressController],
	providers: [PrismaService, ProgressService],
	exports: [ProgressService],
})
export class ProgressModule {}
