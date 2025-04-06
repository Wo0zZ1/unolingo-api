import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from 'src/prisma.service'

import { UpdateTheoryDto } from './dto'
import { Theory } from './entities'

@Injectable()
export class TheoryService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll(): Promise<Theory[]> {
		try {
			return await this.prisma.theory.findMany()
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async getById(id: number): Promise<Theory | null> {
		try {
			return await this.prisma.theory.findUnique({ where: { id } })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async getBySectionId(sectionId: number): Promise<Theory | null> {
		try {
			return await this.prisma.theory.findUnique({ where: { sectionId } })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async updateById(id: number, updateTheoryDto: UpdateTheoryDto): Promise<Theory> {
		try {
			return await this.prisma.theory.update({ where: { id }, data: updateTheoryDto })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async updateBySectionId(sectionId: number, updateTheoryDto: UpdateTheoryDto): Promise<Theory> {
		try {
			return await this.prisma.theory.update({ where: { sectionId }, data: updateTheoryDto })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async deleteById(id: number): Promise<Theory> {
		try {
			return await this.prisma.theory.delete({ where: { id } })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async deleteBySectionId(sectionId: number): Promise<Theory> {
		try {
			return await this.prisma.theory.delete({ where: { sectionId } })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}
}
