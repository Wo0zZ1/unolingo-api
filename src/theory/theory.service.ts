import { Injectable } from '@nestjs/common';
import { CreateTheoryDto } from './dto/create-theory.dto';
import { UpdateTheoryDto } from './dto/update-theory.dto';

@Injectable()
export class TheoryService {
  create(createTheoryDto: CreateTheoryDto) {
    return 'This action adds a new theory';
  }

  findAll() {
    return `This action returns all theory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} theory`;
  }

  update(id: number, updateTheoryDto: UpdateTheoryDto) {
    return `This action updates a #${id} theory`;
  }

  remove(id: number) {
    return `This action removes a #${id} theory`;
  }
}
