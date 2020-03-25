import IResponse from "../IResponse";
import ResponsePlaceholders from "../ResponsePlaceholders";
import { emptyLectionListTemplate } from '../ResponseTemplates.json'
import { replacePattern } from "../../../utils/replace-utils";

export default class EmptyLectionListResponse implements IResponse {

    public readonly template: string = emptyLectionListTemplate

    public buildResponse(): string {
        return replacePattern (
            this.template, 
            ResponsePlaceholders.LectionCreateCommand, 
            'lection-create'
        )
    }

}