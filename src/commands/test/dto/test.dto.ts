import { StringOption } from "necord";

export class TestDto {
    @StringOption({
        name: 'text',
        description: 'This is a test',
        choices: [
            {
                name: 't',
                value: 'x'
            }
        ]
    })
    text: string;
}