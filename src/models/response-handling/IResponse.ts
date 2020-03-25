type ResponseData = {
    [key: string]: string | string[]
}

export default interface IResponse {

    template: string
    buildResponse(data?: ResponseData): string

}