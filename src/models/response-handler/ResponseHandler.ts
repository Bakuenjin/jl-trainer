import ResponsePlaceholder from './ResponsePlaceholder'
import { templates, placeholders } from './responseSettings.json'
import ResponseTemplate from './ResponseTemplate'
import { replacePatternList } from '../../utils/replace-utils'

type ReplacementRule = {
    from: string,
    to: string,
    replaceAll?: boolean
}

type ResponseCreationOptions=  {
    replacementRules: ReplacementRule[]
}

class ResponseHandler {

    public generateResponse(templateName: string, placeholders: string[], values: string[]): string {
        if (placeholders.length > values.length)
            return 'Error while generating response. Tell the developer to fix his shit!'
        
        const template = (<any>templates)[templateName]
        if (!template)
            return 'Unknown response template...'

        return replacePatternList(template, placeholders.map((p, i) => { return { from: p, to: values[i] } }))
    }

    private createResponse(responseName: ResponseTemplate, options: ResponseCreationOptions = { replacementRules: [] }): string {
        const template = templates[responseName]
        return replacePatternList(template, options.replacementRules)
    }

    public createLectionAlreadyExistsResponse(lectionName: string): string {
        return this.createResponse(ResponseTemplate.LectionAlreadyExists, { replacementRules: [
            { from: placeholders[ResponsePlaceholder.LectionName], to: lectionName }
        ]})
    }

    public createLectionCreatedResponse(lectionName: string): string {
        return this.createResponse(ResponseTemplate.LectionCreated, { replacementRules: [
            { from: placeholders[ResponsePlaceholder.LectionName], to: lectionName }
        ]})
    }

    public createLectionListTipResponse(): string {
        return this.createResponse(ResponseTemplate.LectionListTip, { replacementRules: [
            { from: placeholders[ResponsePlaceholder.LectionListCommand], to: 'lection-list' }
        ]})
    }

    public createLectionListResponse(lectionNames: string[]): string {
        return this.createResponse(ResponseTemplate.LectionList, { replacementRules: [
            { from: placeholders[ResponsePlaceholder.LectionNames], to: `\t - **${lectionNames.join('**\n\t - **')}**` }
        ]})
    }

    public createEmptyLectionListResponse(): string {
        return this.createResponse(ResponseTemplate.EmptyLectionList, { replacementRules: [
            { from: placeholders[ResponsePlaceholder.LectionAddCommand], to: 'lection-add' }
        ]})
    }

    public createLectionNotFoundResponse(lectionName: string): string {
        return this.createResponse(ResponseTemplate.LectionNotFound, { replacementRules: [
            { from: placeholders[ResponsePlaceholder.LectionName], to: lectionName }
        ]})
    }

    public createLectionRenameSuccessResponse(oldName: string, newName: string): string {
        return this.createResponse(ResponseTemplate.LectionRenameSuccess, { replacementRules: [
            { from: placeholders[ResponsePlaceholder.OldLectionName], to: oldName },
            { from: placeholders[ResponsePlaceholder.NewLectionName], to: newName }
        ]})
    }

    public createLectionRemoveQuestionResponse(lectionName: string): string {
        return this.createResponse(ResponseTemplate.LectionRemoveQuestion, { replacementRules: [
            { from: placeholders[ResponsePlaceholder.LectionName], to: lectionName }
        ]})
    }

    public createLectionRemoveSuccessResponse(lectionName: string): string {
        return this.createResponse(ResponseTemplate.LectionRemoveSuccess, { replacementRules: [
            { from: placeholders[ResponsePlaceholder.LectionName], to: lectionName }
        ] })
    }

    public createLectionRemoveDeniedResponse(lectionName: string): string {
        return this.createResponse(ResponseTemplate.LectionRemoveDenied, { replacementRules: [
            { from: placeholders[ResponsePlaceholder.LectionName], to: lectionName }
        ] })
    }

    public createWordCreatedResponse(wordTitle: string, lectionName: string): string {
        return this.createResponse(ResponseTemplate.WordCreated, { replacementRules: [
            { from: placeholders[ResponsePlaceholder.WordTitle], to: wordTitle },
            { from: placeholders[ResponsePlaceholder.LectionName], to: lectionName }
        ] })
    }

}

export const responseHandler = new ResponseHandler()
