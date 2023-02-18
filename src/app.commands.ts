import { Injectable } from "@nestjs/common";
import { Context, Options, SlashCommand, SlashCommandContext } from "necord";
import { TestDto } from "./commands/test/dto/test.dto";
import { TestCommand } from "./commands/test/test.command";

@Injectable()
export class AppCommands {

    public constructor(
        private readonly testCommand: TestCommand,
    ) {}

    @SlashCommand({ name: 'test', description: 'Test command' })
    public async onTest(@Context() [interaction]: SlashCommandContext, @Options() dto: TestDto) {
        return this.testCommand.run([interaction], dto);
    }
}