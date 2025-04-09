import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from 'src/prisma.service'

import { CreateSectionDto, UpdateSectionDto } from './dto'
import { Section } from './entities'

@Injectable()
export class SectionsService {
	constructor(private readonly prisma: PrismaService) {}

	async create(createSectionDto: CreateSectionDto): Promise<Section> {
		try {
			return await this.prisma.section.create({
				data: { ...createSectionDto, theory: { create: {} } },
			})
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async getAll(): Promise<Section[]> {
		try {
			return await this.prisma.section.findMany()
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async getAllByLanguageId(languageId: number): Promise<Section[]> {
		try {
			return await this.prisma.section.findMany({ where: { languageId } })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async getById(id: number): Promise<Section | null> {
		try {
			return await this.prisma.section.findUnique({ where: { id } })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async getByLevelId(levelId: number): Promise<Section | null> {
		try {
			return await this.prisma.section.findFirst({ where: { levels: { some: { id: levelId } } } })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async getByLanguageIdAndOrder(languageId: number, order: number): Promise<Section | null> {
		try {
			return await this.prisma.section.findUnique({
				where: { languageId_order: { languageId, order } },
			})
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async updateById(id: number, updateSectionDto: UpdateSectionDto): Promise<Section> {
		try {
			return await this.prisma.section.update({ where: { id }, data: updateSectionDto })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async updateByLanguageIdAndOrder(
		languageId: number,
		order: number,
		updateSectionDto: UpdateSectionDto,
	): Promise<Section> {
		try {
			return await this.prisma.section.update({
				where: { languageId_order: { languageId, order } },
				data: updateSectionDto,
			})
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async deleteById(id: number): Promise<Section> {
		try {
			return await this.prisma.section.delete({ where: { id } })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async deleteByLanguageIdAndOrder(languageId: number, order: number): Promise<Section> {
		try {
			return await this.prisma.section.delete({
				where: { languageId_order: { languageId, order } },
			})
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}
}
