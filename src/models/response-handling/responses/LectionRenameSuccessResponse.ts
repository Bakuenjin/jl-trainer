import IResponse from "../IResponse";
import ResponsePlaceholders from "../ResponsePlaceholders";
import { lectionRenameSuccessTemplate } from '../ResponseTemplates.json'
import { replacePatternList } from "../../../utils/replace-utils";

type LectionRenameSuccessResponseData = {
    oldLectionName: string
    newLectionName: string
}

export default class LectionRenameSuccessResponse implements IResponse {

    public readonly template: string = lectionRenameSuccessTemplate

    public buildResponse(data: LectionRenameSuccessResponseData): string {
        return replacePatternList (
            this.template, 
            [{ from: ResponsePlaceholders.OldLectionName, to: data.oldLectionName },
             { from: ResponsePlaceholders.NewLectionName, to: data.newLectionName }]
        )
    }

}