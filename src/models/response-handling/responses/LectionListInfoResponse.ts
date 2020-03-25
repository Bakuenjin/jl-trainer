import IResponse from "../IResponse";
import ResponsePlaceholders from "../ResponsePlaceholders";
import { lectionListInfoTemplate } from '../ResponseTemplates.json'
import { replacePattern } from "../../../utils/replace-utils";

export default class LectionListInfoResponse implements IResponse {

    public readonly template: string = lectionListInfoTemplate

    public buildResponse(): string {
        return replacePattern (
            this.template, 
            ResponsePlaceholders.LectionListCommand, 
            'lection-list'
        )
    }

}