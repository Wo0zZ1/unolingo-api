import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common'
import { LevelsService } from './levels.service'
import { CreateLevelDto } from './dto/create-level.dto'
import { UpdateLevelDto } from './dto/update-level.dto'

@Controller('levels')
export class LevelsController {
	constructor(private readonly levelsService: LevelsService) {}

	@Post()
	createLevel(@Body() createLevelDto: CreateLevelDto) {
		// return this.levelsService.create(createLevelDto)
	}

	@Get('/section/:sectionId')
	getLevels(@Param('sectionId', ParseIntPipe) id: number) {
		// return this.levelsService.findAll()
	}

	@Get(':id')
	getLevel(@Param('id', ParseIntPipe) id: number) {
		// return this.levelsService.findOne(id)
	}

	@Patch(':id')
	updateLevel(@Param('id', ParseIntPipe) id: number, @Body() updateLevelDto: UpdateLevelDto) {
		// return this.levelsService.update(id, updateLevelDto)
	}

	@Delete(':id')
	deleteLevel(@Param('id', ParseIntPipe) id: number) {
		// return this.levelsService.remove(id)
	}
}
