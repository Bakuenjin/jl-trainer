import IResponse from "../IResponse";
import ResponsePlaceholders from "../ResponsePlaceholders";
import { wordSelectedTemplate } from '../ResponseTemplates.json'
import { replacePattern } from "../../../utils/replace-utils";

type WordSelectedResponseData = {
    wordTitle: string
}

export default class WordSelectedResponse implements IResponse {

    public readonly template: string = wordSelectedTemplate

    public buildResponse(data: WordSelectedResponseData): string {
        return replacePattern (
            this.template,
            ResponsePlaceholders.WordTitle,
            data.wordTitle
        )
    }

}