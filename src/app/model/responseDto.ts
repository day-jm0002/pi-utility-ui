export class SerializedObject {
    statusCode: number
    serializedObject: string
    isResponseOk: boolean
    ErrorMessage: string[];
}

export class ResponseDto{
    /**
     *
     */
    constructor() {
        
    }
    SerializedObject: string = ""
    ErrorMessage: string[] = []
    IsResponseOk: boolean = false
    StatusCode: number
}