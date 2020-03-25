import IResponse from "../IResponse";
import ResponsePlaceholders from "../ResponsePlaceholders";
import { lectionListTemplate } from '../ResponseTemplates.json'
import { replacePattern } from "../../../utils/replace-utils";

type LectionNotFoundResponseData = {
    lectionName: string
}

export default class LectionNotFoundResponse implements IResponse {

    public readonly template: string = lectionListTemplate

    public buildResponse(data: LectionNotFoundResponseData): string {
        return replacePattern (
            this.template, 
            ResponsePlaceholders.LectionName, 
            data.lectionName
        )
    }

}