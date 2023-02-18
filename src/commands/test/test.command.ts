import { Injectable } from "@nestjs/common";
import { Context, SlashCommandContext } from "necord";
import { TestDto } from "./dto/test.dto";

@Injectable()
export class TestCommand {
    async run(@Context() [interaction]: SlashCommandContext, dto: TestDto) {
        await interaction.reply('test')
    }
}