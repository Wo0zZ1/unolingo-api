import { Module } from '@nestjs/common';
import { TheoryService } from './theory.service';
import { TheoryController } from './theory.controller';

@Module({
  controllers: [TheoryController],
  providers: [TheoryService],
})
export class TheoryModule {}
