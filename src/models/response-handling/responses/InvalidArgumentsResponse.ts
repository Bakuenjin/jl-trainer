import IResponse from "../IResponse";
import { invalidArgumentsTemplate } from '../ResponseTemplates.json'

export default class InvalidArgumentsResponse implements IResponse {

    public readonly template: string = invalidArgumentsTemplate

    public buildResponse(): string {
        return this.template
    }

}