import { Message, PartialMessage } from "discord.js"

export default class ActivatedCommand {


    private _name: string
    private _args: string[]
    private _message: Message | PartialMessage

    constructor(name: string, args: string[], message: Message | PartialMessage) {
        this._name = name
        this._args = args
        this._message = message
    }

    /**
     * The name of the command.
     */
    get name(): string {
        return this._name
    }

    /**
     * Array of command arguments.
     */
    get args(): string[] {
        return this._args
    }

    /**
     * The actual message that activated the command.
     */
    get message(): Message | PartialMessage {
        return this._message
    }


    public async reply(content: any): Promise<Message | undefined> {
        if (this._message.channel)
            return await this._message.channel.send(content)
    }

}