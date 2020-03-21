import { EventEmitter } from "events";
import { Client, Message, PartialMessage, User, MessageReaction, PartialUser } from "discord.js";
import sleep from "../utils/sleep";

type ReactionCallback = (reaction: string, user: User | PartialUser) => void
type ObservingStoppedCallback = () => void
type ObserveOptions = {
    /**
     * The amount of time in seconds to listen for reaction changes.
     */
    duration?: number,
    /**
     * Should only one and the first reaction be handled?
     */
    once?: boolean
}

declare interface ReactionObserver {

    on(event: 'reactionAdd' | 'reactionRemove', callback: ReactionCallback): this
    on(event: 'observingStopped', callback: ObservingStoppedCallback): this

}

class ReactionObserver extends EventEmitter {

    private _client: Client
    private _message: Message | PartialMessage
    private _reactions: string[]
    private _isObserving: boolean
    private _currentAddListener!: (messageReaction: MessageReaction, user: User | PartialUser) => void
    private _currentRemoveListener!: (messageReaction: MessageReaction, user: User | PartialUser) => void

    constructor(client: Client, message: Message | PartialMessage, reactions: string[]) {
        super()
        this._client = client
        this._message = message
        this._reactions = reactions
        this._isObserving = false
    }

    public async initialize(): Promise<void> {
        if (!this._message.react) return

        for (const reaction of this._reactions)
            await this._message.react(reaction)
    }

    public async reset(): Promise<void> {
        if (this._message.reactions)
            await this._message.reactions.removeAll()
    }

    public async observe(options: ObserveOptions = {}): Promise<void> {
        if (this._isObserving)
            return

        this._currentAddListener = this.reactionAddListener.bind(this)
        this._currentRemoveListener = this.reactionRemoveListener.bind(this)
            
        if (options.once) {
            this._client.once('messageReactionAdd', this._currentAddListener)
            this._client.once('messageReactionRemove', this._currentRemoveListener)
        }
        else {
            this._client.on('messageReactionAdd', this._currentAddListener)
            this._client.on('messageReactionRemove', this._currentRemoveListener)
        }

        this._isObserving = true

        if (typeof options.duration === 'number' && options.duration > 0) {
            await sleep(options.duration * 1000)
            this.stop()
        }
    }

    public stop(): void {
        if (this._isObserving) {
            this._client.removeListener('messageReactionAdd', this._currentAddListener)
            this._client.removeListener('messageReactionRemove', this._currentRemoveListener)
            this.emit('observingStopped')
            this._isObserving = false
        }
    }

    private reactionAddListener(messageReaction: MessageReaction, user: User | PartialUser) {
        this.emit('reactionAdd', messageReaction.emoji.name, user)
    }
    private reactionRemoveListener(messageReaction: MessageReaction, user: User | PartialUser) {
        this.emit('reactionRemove', messageReaction.emoji.name, user)
    }

}

export default ReactionObserver