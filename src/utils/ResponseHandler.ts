import ResponsePlaceholder from './ResponsePlaceholder'
import responseSettings from './responseSettings.json'
import ResponseTemplate from './ResponseTemplate'
import { replacePatternList } from './replace-utils'

type ReplacementRule = {
    from: string,
    to: string,
    replaceAll?: boolean
}

type ResponseCreationOptions=  {
    replacementRules: ReplacementRule[]
}

class ResponseHandler {

    private createResponse(responseName: ResponseTemplate, options: ResponseCreationOptions = { replacementRules: [] }): string {
        const template = responseSettings.templates[responseName]
        return replacePatternList(template, options.replacementRules)
    }

    public createLectionAlreadyExistsResponse(lectionName: string): string {
        return this.createResponse(ResponseTemplate.LectionAlreadyExists, { replacementRules: [
            { from: responseSettings.palceholders[ResponsePlaceholder.LectionName], to: lectionName }
        ]})
    }

    public createLectionCreatedResponse(lectionName: string): string {
        return this.createResponse(ResponseTemplate.LectionCreated, { replacementRules: [
            { from: responseSettings.palceholders[ResponsePlaceholder.LectionName], to: lectionName }
        ]})
    }

    public createLectionListTipResponse(): string {
        return this.createResponse(ResponseTemplate.LectionListTip, { replacementRules: [
            { from: responseSettings.palceholders[ResponsePlaceholder.LectionListCommand], to: 'lection-list' }
        ]})
    }

    public createLectionListResponse(lectionNames: string[]): string {
        return this.createResponse(ResponseTemplate.LectionList, { replacementRules: [
            { from: responseSettings.palceholders[ResponsePlaceholder.LectionNames], to: `\t - **${lectionNames.join('**\n\t - **')}**` }
        ]})
    }

    public createEmptyLectionListResponse(): string {
        return this.createResponse(ResponseTemplate.EmptyLectionList, { replacementRules: [
            { from: responseSettings.palceholders[ResponsePlaceholder.LectionAddCommand], to: 'lection-add' }
        ]})
    }

    public createLectionNotFoundResponse(lectionName: string): string {
        return this.createResponse(ResponseTemplate.LectionNotFound, { replacementRules: [
            { from: responseSettings.palceholders[ResponsePlaceholder.LectionName], to: lectionName }
        ]})
    }

    public createLectionRenameSuccessResponse(oldName: string, newName: string): string {
        return this.createResponse(ResponseTemplate.LectionRenameSuccess, { replacementRules: [
            { from: responseSettings.palceholders[ResponsePlaceholder.OldLectionName], to: oldName },
            { from: responseSettings.palceholders[ResponsePlaceholder.NewLectionName], to: newName }
        ]})
    }

}

export const responseHandler = new ResponseHandler()
