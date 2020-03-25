import IResponse from "../IResponse";
import ResponsePlaceholders from "../ResponsePlaceholders";
import { lectionCreatedTemplate } from '../ResponseTemplates.json'
import { replacePattern } from "../../../utils/replace-utils";

type LectionCreatedResponseData = {
    lectionName: string
}

export default class LectionCreatedResponse implements IResponse {

    public readonly template: string = lectionCreatedTemplate

    public buildResponse(data: LectionCreatedResponseData): string {
        return replacePattern (
            this.template, 
            ResponsePlaceholders.LectionName, 
            data.lectionName
        )
    }

}