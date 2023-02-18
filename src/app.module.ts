import { Module } from '@nestjs/common';
import { AppCommands } from './app.commands';
import { CommandsModule } from './commands/commands.module';
import { TestModule } from './commands/test/test.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NecordModule } from 'necord';
import { GatewayIntentBits } from 'discord.js';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    NecordModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          token: configService.get<string>('DISCORD_TOKEN'),
          skipRegistration: true,
          intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.DirectMessages,
          ],
          // development: [
          //   configService.get<string>('DISCORD_DEVELOPMENT_GUILD_ID')
          // ],
        };
      },
    }),
    TestModule,
    CommandsModule,
  ],
  providers: [
    AppCommands,
  ],
})
export class AppModule {}
