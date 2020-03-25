import IResponse from "../IResponse";
import ResponsePlaceholders from "../ResponsePlaceholders";
import { lectionRemoveSuccessTemplate } from '../ResponseTemplates.json'
import { replacePattern } from "../../../utils/replace-utils";

type LectionRemoveSuccessResponseData = {
    lectionName: string
}

export default class LectionRemoveSuccessResponse implements IResponse {

    public readonly template: string = lectionRemoveSuccessTemplate

    public buildResponse(data: LectionRemoveSuccessResponseData): string {
        return replacePattern (
            this.template, 
            ResponsePlaceholders.LectionName,
            data.lectionName
        )
    }

}