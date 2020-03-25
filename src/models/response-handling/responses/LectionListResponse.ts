import IResponse from "../IResponse";
import ResponsePlaceholders from "../ResponsePlaceholders";
import { lectionListTemplate } from '../ResponseTemplates.json'
import { replacePattern } from "../../../utils/replace-utils";

type LectionListResponseData = {
    lectionNames: string[]
}

export default class LectionListResponse implements IResponse {

    public readonly template: string = lectionListTemplate

    public buildResponse(data: LectionListResponseData): string {
        return replacePattern (
            this.template, 
            ResponsePlaceholders.LectionNames, 
            data.lectionNames.join('\n')
        )
    }

}