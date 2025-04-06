import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseIntPipe,
	NotFoundException,
	Logger,
} from '@nestjs/common'

import { TasksService } from './tasks.service'

import { CreateTaskDto, UpdateTaskDto } from './dto/'

@Controller('tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	logger = new Logger()

	@Post()
	async createTask(@Body() createTaskDto: CreateTaskDto) {
		this.logger.log('tasks createTask')

		return await this.tasksService.create(createTaskDto)
	}

	@Get()
	async getTasks() {
		this.logger.log('tasks getTasks')

		return await this.tasksService.getAll()
	}

	@Get('/level/:levelId')
	async getTasksByLevelId(@Param('levelId', ParseIntPipe) levelId: number) {
		this.logger.log('tasks/level/:levelId getTasksByLevelId')

		return await this.tasksService.getAllByLevelId(levelId)
	}

	@Get('/level/:levelId/:order')
	async getTaskByLevelIdAndOrder(
		@Param('levelId', ParseIntPipe) levelId: number,
		@Param('order', ParseIntPipe) order: number,
	) {
		this.logger.log('tasks/level/:levelId/:order getTaskByLevelIdAndOrder')

		const task = await this.tasksService.getByLevelIdAndOrder(levelId, order)
		if (!task) throw new NotFoundException()
		return task
	}

	@Get(':id')
	async getTaskById(@Param('id', ParseIntPipe) id: number) {
		this.logger.log('tasks/:id getTaskById')

		const task = await this.tasksService.getById(id)
		if (!task) throw new NotFoundException()
		return task
	}

	@Patch(':id')
	async updateTaskById(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateTaskDto: UpdateTaskDto,
	) {
		this.logger.log('tasks/:id updateTaskById')

		return await this.tasksService.updateById(id, updateTaskDto)
	}

	@Patch('/level:levelId/:order')
	async updateTaskByLevelIdAndOrder(
		@Param('levelId', ParseIntPipe) levelId: number,
		@Param('order', ParseIntPipe) order: number,
	) {
		this.logger.log('tasks/level:levelId/:order updateTaskByLevelIdAndOrder')

		return await this.tasksService.getByLevelIdAndOrder(levelId, order)
	}

	@Delete(':id')
	async deleteTask(@Param('id', ParseIntPipe) id: number) {
		this.logger.log('tasks/:id deleteTask')

		return await this.tasksService.delete(id)
	}
}
