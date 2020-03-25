import IResponse from "../IResponse";
import ResponsePlaceholders from "../ResponsePlaceholders";
import { lectionSelectedTemplate } from '../ResponseTemplates.json'
import { replacePattern } from "../../../utils/replace-utils";

type LectionSelectedResponseData = {
    lectionName: string
}

export default class LectionSelectedResponse implements IResponse {

    public readonly template: string = lectionSelectedTemplate

    public buildResponse(data: LectionSelectedResponseData): string {
        return replacePattern (
            this.template, 
            ResponsePlaceholders.LectionName, 
            data.lectionName
        )
    }

}