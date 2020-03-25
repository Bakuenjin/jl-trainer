import IResponse from "../IResponse";
import ResponsePlaceholders from "../ResponsePlaceholders";
import { lectionRemoveDeniedTemplate } from '../ResponseTemplates.json'
import { replacePattern } from "../../../utils/replace-utils";

type LectionRemoveDeniedResponseData = {
    lectionName: string
}

export default class LectionRemoveDeniedResponse implements IResponse {

    public readonly template: string = lectionRemoveDeniedTemplate

    public buildResponse(data: LectionRemoveDeniedResponseData): string {
        return replacePattern (
            this.template,
            ResponsePlaceholders.LectionName,
            data.lectionName
        )
    }

}