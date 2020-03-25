import IResponse from "../IResponse";
import ResponsePlaceholders from "../ResponsePlaceholders";
import { wordCreatedTemplate } from '../ResponseTemplates.json'
import { replacePatternList } from "../../../utils/replace-utils";

type WordCreatedResponseData = {
    wordTitle: string
    lectionName: string
}

export default class WordCreatedResponse implements IResponse {

    public readonly template: string = wordCreatedTemplate

    public buildResponse(data: WordCreatedResponseData): string {
        return replacePatternList (
            this.template,
            [{ from: ResponsePlaceholders.WordTitle, to: data.wordTitle },
             { from: ResponsePlaceholders.LectionName, to: data.lectionName }]
        )
    }

}