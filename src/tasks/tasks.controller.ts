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
} from '@nestjs/common'

import { TasksService } from './tasks.service'

import { CreateTaskDto, UpdateTaskDto } from './dto/'

@Controller('tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@Post()
	async createTask(@Body() createTaskDto: CreateTaskDto) {
		return await this.tasksService.create(createTaskDto)
	}

	@Get()
	async getTasks() {
		return await this.tasksService.getAll()
	}

	@Get('/level/:levelId')
	async getTasksByLevelId(@Param('levelId', ParseIntPipe) levelId: number) {
		return await this.tasksService.getAllByLevelId(levelId)
	}

	@Get('/level/:levelId/:order')
	async getTaskByLevelIdAndOrder(
		@Param('levelId', ParseIntPipe) levelId: number,
		@Param('order', ParseIntPipe) order: number,
	) {
		const task = await this.tasksService.getByLevelIdAndOrder(levelId, order)
		if (!task) throw new NotFoundException()
		return task
	}

	@Get(':id')
	async getTaskById(@Param('id', ParseIntPipe) id: number) {
		const task = await this.tasksService.getById(id)
		if (!task) throw new NotFoundException()
		return task
	}

	@Patch(':id')
	async updateTaskById(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateTaskDto: UpdateTaskDto,
	) {
		return await this.tasksService.updateById(id, updateTaskDto)
	}

	@Patch('/level:levelId/:order')
	async updateTaskByLevelIdAndOrder(
		@Param('levelId', ParseIntPipe) levelId: number,
		@Param('order', ParseIntPipe) order: number,
	) {
		return await this.tasksService.getByLevelIdAndOrder(levelId, order)
	}

	@Delete(':id')
	async deleteTask(@Param('id', ParseIntPipe) id: number) {
		return await this.tasksService.delete(id)
	}
}
