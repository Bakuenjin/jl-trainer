import IResponse from "../IResponse";
import ResponsePlaceholders from "../ResponsePlaceholders";
import { lectionRemoveQuestionTemplate } from '../ResponseTemplates.json'
import { replacePattern } from "../../../utils/replace-utils";

type LectionRemoveQuestionResponseData = {
    lectionName: string
}

export default class LectionRemoveQuestionResponse implements IResponse {

    public readonly template: string = lectionRemoveQuestionTemplate

    public buildResponse(data: LectionRemoveQuestionResponseData): string {
        return replacePattern (
            this.template,
            ResponsePlaceholders.LectionName,
            data.lectionName
        )
    }

}