import IResponse from "../IResponse";
import ResponsePlaceholders from "../ResponsePlaceholders";
import { lectionAlreadyExistsTemplate } from '../ResponseTemplates.json'
import { replacePattern } from "../../../utils/replace-utils";

type LectionAlreadyExistsResponseData = {
    lectionName: string
}

export default class LectionAlreadyExistsResponse implements IResponse {

    public readonly template: string = lectionAlreadyExistsTemplate

    public buildResponse(data: LectionAlreadyExistsResponseData): string {
        return replacePattern (
            this.template, 
            ResponsePlaceholders.LectionName, 
            data.lectionName
        )
    }

}