import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TheoryService } from './theory.service';
import { CreateTheoryDto } from './dto/create-theory.dto';
import { UpdateTheoryDto } from './dto/update-theory.dto';

@Controller('theory')
export class TheoryController {
  constructor(private readonly theoryService: TheoryService) {}

  @Post()
  create(@Body() createTheoryDto: CreateTheoryDto) {
    return this.theoryService.create(createTheoryDto);
  }

  @Get()
  findAll() {
    return this.theoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.theoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTheoryDto: UpdateTheoryDto) {
    return this.theoryService.update(+id, updateTheoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.theoryService.remove(+id);
  }
}
