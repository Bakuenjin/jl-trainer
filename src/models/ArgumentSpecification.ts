import Describable from "./Describable"

export default class ArgumentSpecification extends Describable {

    public readonly name: string
    public readonly description: string
    public readonly required: boolean

    constructor(name: string, description: string, required: boolean) {
        super()
        this.name = name
        this.description = description
        this.required = required
    }

}