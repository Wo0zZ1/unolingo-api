import { Module } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'

import { TasksService } from './tasks.service'
import { TasksController } from './tasks.controller'

@Module({
	controllers: [TasksController],
	providers: [PrismaService, TasksService],
})
export class TasksModule {}
