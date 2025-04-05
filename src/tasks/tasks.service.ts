import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from 'src/prisma.service'

import { CreateTaskDto, UpdateTaskDto } from './dto'
import { Task } from './entities'

@Injectable()
export class TasksService {
	constructor(private readonly prisma: PrismaService) {}

	async create(createTaskDto: CreateTaskDto): Promise<Task> {
		try {
			return await this.prisma.task.create({ data: createTaskDto })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async getAll(): Promise<Task[]> {
		try {
			return await this.prisma.task.findMany()
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async getById(id: number): Promise<Task | null> {
		try {
			return await this.prisma.task.findUnique({ where: { id } })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async getAllByLevelId(levelId: number): Promise<Task[] | null> {
		try {
			return await this.prisma.task.findMany({ where: { levelId } })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async getByLevelIdAndOrder(levelId: number, order: number): Promise<Task | null> {
		try {
			return await this.prisma.task.findUnique({ where: { levelId_order: { levelId, order } } })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async updateById(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
		try {
			return await this.prisma.task.update({ where: { id }, data: updateTaskDto })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async updateByLevelIdAndOrder(
		levelId: number,
		order: number,
		updateTaskDto: UpdateTaskDto,
	): Promise<Task> {
		try {
			return await this.prisma.task.update({
				where: { levelId_order: { levelId, order } },
				data: updateTaskDto,
			})
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async delete(id: number): Promise<Task> {
		try {
			return await this.prisma.task.delete({ where: { id } })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}
}
