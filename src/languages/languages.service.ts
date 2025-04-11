import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { PrismaService } from 'src/prisma.service'

import { CreateLanguageDto, UpdateLanguageDto } from './dto'
import { Language } from './entities'

@Injectable()
export class LanguagesService {
	constructor(private readonly prisma: PrismaService) {}

	async createLanguage(createLanguageDto: CreateLanguageDto): Promise<Language> {
		try {
			return await this.prisma.language.create({ data: createLanguageDto })
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async getLanguages(): Promise<Language[]> {
		try {
			return await this.prisma.language.findMany()
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async getLanguage(id: number): Promise<Language | null> {
		try {
			return await this.prisma.language.findUnique({ where: { id } })
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async updateLanguage(id: number, updateLanguageDto: UpdateLanguageDto): Promise<Language> {
		try {
			return await this.prisma.language.update({
				where: { id },
				data: updateLanguageDto,
			})
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}

	async deleteLanguage(id: number): Promise<Language> {
		try {
			return await this.prisma.language.delete({ where: { id } })
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2025') throw new NotFoundException()
				if (error.code === 'P2002') throw new ConflictException()
			}
			throw error
		}
	}
}
