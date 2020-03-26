import IResponse from "../IResponse";
import ResponsePlaceholders from "../ResponsePlaceholders";
import { wordNotInSelectedLectionTemplate } from '../ResponseTemplates.json'
import { replacePattern, replacePatternList } from "../../../utils/replace-utils";

type WordNotInSelectedectionResponseData = {
    lectionName: string
    wordTitle: string
}

export default class WordNotInSelectedLectionResponse implements IResponse {

    public readonly template: string = wordNotInSelectedLectionTemplate

    public buildResponse(data: WordNotInSelectedectionResponseData): string {
        return replacePatternList (
            this.template,
            [{ from: ResponsePlaceholders.LectionName, to: data.lectionName },
             { from: ResponsePlaceholders.WordTitle, to: data.wordTitle }]
        )
    }

}