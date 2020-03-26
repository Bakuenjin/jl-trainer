import IResponse from "../IResponse";
import ResponsePlaceholders from "../ResponsePlaceholders";
import { lectionInfoTemplate } from '../ResponseTemplates.json'
import { replacePatternList } from "../../../utils/replace-utils";

type LectionInfoResponseData = {
    lectionName: string
    wordTitles: string[]
}

export default class LectionInfoResponse implements IResponse {

    public readonly template: string = lectionInfoTemplate

    public buildResponse(data: LectionInfoResponseData): string {
        return replacePatternList (
            this.template,
            [{ from: ResponsePlaceholders.LectionName, to: data.lectionName },
             { from: ResponsePlaceholders.WordsAmount, to: data.wordTitles.length.toString() },
             { from: ResponsePlaceholders.WordTitles, to: data.wordTitles.join('\n')}]
        )
    }

}