import { HttpService } from '@nestjs/axios';
import { Injectable, SetMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { ApplicationCommandType, Client } from 'discord.js';
import { CommandsService as NecordCommandService, SLASH_COMMAND_METADATA, SUBCOMMAND_METADATA, SlashCommandDiscovery, SlashCommandsService } from 'necord';
import { ExplorerService } from 'necord/dist/necord-explorer.service';

@Injectable()
export class CommandsService {
    constructor(
        private readonly client: Client,
        private readonly slashCommandService: SlashCommandsService,
        private readonly commandsService: NecordCommandService,
        private readonly explorerService: ExplorerService<SlashCommandDiscovery>,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    @Cron('*/15 * * * *')
    async registerCommands() {
        await this.registerGuildCommands();
    }

    async onApplicationBootstrap() {
        await this.registerGuildCommands();
    }

    async registerGuildCommands() {
        try {
            // const response = await this.httpService.axiosRef.get(`${this.configService.get<string>('MERCURY_API_BASE_URL')}/guild`);
    
            // const guilds = [...response.data];

            const guilds = [{
                id: '1038912703894401034',
                licensedCommands: ['test']
            }]
    
            const commands = this.explorerService.explore(SLASH_COMMAND_METADATA);
    
            commands.forEach(c => {

                const allowedGuilds = guilds.filter(g => g.licensedCommands.indexOf(c.getName()) >= 0)

                c['meta']['guilds'] = [...allowedGuilds.map(({id}) => id)];
    
                this.slashCommandService.add(c);
            });
            
            this.explorerService
                .explore(SUBCOMMAND_METADATA)
                .forEach(subcommand => this.slashCommandService.addSubCommand(subcommand));
            
            this.client.on('ready', () => this.commandsService.register(this.client))
            
        } catch (error) {
            throw new Error('API Guild response failed')
        }
    }
}
