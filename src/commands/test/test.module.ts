import { Module } from '@nestjs/common';
import { TestCommand } from './test.command';

@Module({
  imports: [],
  providers: [TestCommand],
  exports: [TestCommand]
})
export class TestModule {}
