import IResponse from "../IResponse";
import ResponsePlaceholders from "../ResponsePlaceholders";
import { wordNotFoundTemplate } from '../ResponseTemplates.json'
import { replacePattern } from "../../../utils/replace-utils";

type WordNotFoundResponseData = {
    wordTitle: string
}

export default class WordNotFoundResponse implements IResponse {

    public readonly template: string = wordNotFoundTemplate

    public buildResponse(data: WordNotFoundResponseData): string {
        return replacePattern (
            this.template,
            ResponsePlaceholders.WordTitle,
            data.wordTitle
        )
    }

}