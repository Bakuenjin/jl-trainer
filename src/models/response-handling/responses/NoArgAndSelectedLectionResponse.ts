import IResponse from "../IResponse";
import { noArgumentAndSelectedLectionTemplate } from '../ResponseTemplates.json'

export default class NoArgAndSelectedLectionResponse implements IResponse {

    public readonly template: string = noArgumentAndSelectedLectionTemplate

    public buildResponse(): string {
        return this.template
    }

}