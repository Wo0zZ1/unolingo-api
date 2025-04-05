import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from 'src/prisma.service'

import { CreateLevelDto, UpdateLevelDto } from './dto'
import { Level } from './entities'

@Injectable()
export class LevelsService {
	constructor(private readonly prisma: PrismaService) {}

	async create(createLevelDto: CreateLevelDto): Promise<Level> {
		try {
			return await this.prisma.level.create({ data: createLevelDto })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async getAll(): Promise<Level[]> {
		try {
			return await this.prisma.level.findMany()
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async getBySectionId(sectionId: number): Promise<Level[]> {
		try {
			return await this.prisma.level.findMany({ where: { sectionId } })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async getById(id: number): Promise<Level | null> {
		try {
			return await this.prisma.level.findUnique({ where: { id } })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async getBySectionIdAndOrder(sectionId: number, order: number): Promise<Level | null> {
		try {
			return await this.prisma.level.findUnique({
				where: { sectionId_order: { sectionId, order } },
			})
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async updateById(id: number, updateLevelDto: UpdateLevelDto): Promise<Level> {
		try {
			return await this.prisma.level.update({ where: { id }, data: updateLevelDto })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async updateBySectionIdAndOrder(
		sectionId: number,
		order: number,
		updateLevelDto: UpdateLevelDto,
	): Promise<Level> {
		try {
			return await this.prisma.level.update({
				where: { sectionId_order: { sectionId, order } },
				data: updateLevelDto,
			})
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async deleteById(id: number): Promise<Level> {
		try {
			return await this.prisma.level.delete({ where: { id } })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async deleteBySectionIdAndOrder(sectionId: number, order: number): Promise<Level> {
		try {
			return await this.prisma.level.delete({ where: { sectionId_order: { sectionId, order } } })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}
}
