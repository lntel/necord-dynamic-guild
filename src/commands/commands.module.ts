import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { SlashCommandsService } from 'necord';
import { CommandsService } from './commands.service';
import { ExplorerService } from 'necord/dist/necord-explorer.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [DiscoveryModule, ConfigModule, HttpModule, ScheduleModule.forRoot()],
  providers: [CommandsService, ExplorerService, SlashCommandsService]
})
export class CommandsModule {}
