import IResponse from "../IResponse";
import ResponsePlaceholders from "../ResponsePlaceholders";
import { currentSelectionInfoTemplate } from '../ResponseTemplates.json'
import { replacePatternList } from "../../../utils/replace-utils";

type CurrentSelectionInfoResponseData = {
    lectionName: string
    wordTitle: string
    translationContent: string
}

export default class CurrentSelectionInfoResponse implements IResponse {

    public readonly template: string = currentSelectionInfoTemplate

    public buildResponse(data: CurrentSelectionInfoResponseData): string {
        return replacePatternList (
            this.template,
            [
                { from: ResponsePlaceholders.LectionName, to: data.lectionName },
                { from: ResponsePlaceholders.WordTitle, to: data.wordTitle },
                { from: ResponsePlaceholders.TranslationContent, to: data.translationContent }
            ]
        )
    }

}