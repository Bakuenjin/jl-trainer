import IResponse from "../IResponse";
import ResponsePlaceholders from "../ResponsePlaceholders";
import { wordAlreadyExistsTemplate } from '../ResponseTemplates.json'
import { replacePattern } from "../../../utils/replace-utils";

type WordAlreadyExistsResponseData = {
    wordTitle: string
}

export default class WordAlreadyExistsResponse implements IResponse {

    public readonly template: string = wordAlreadyExistsTemplate

    public buildResponse(data: WordAlreadyExistsResponseData): string {
        return replacePattern (
            this.template, 
            ResponsePlaceholders.WordTitle, 
            data.wordTitle
        )
    }

}