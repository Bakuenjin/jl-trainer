import IResponse from "../IResponse";
import { lectionNotSelectedTemplate } from '../ResponseTemplates.json'

export default class LectionNotSelectedResponse implements IResponse {

    public readonly template: string = lectionNotSelectedTemplate

    public buildResponse(): string {
        return lectionNotSelectedTemplate
    }

}