export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value) => {
    if (value) return undefined;

    return "Field is required";
}


export const minLengthValidate = (minLength: number): FieldValidatorType => (value: string)=> {
    if (value && value.length < minLength) return `Max length is ${minLength} symbols `
    return undefined
}
export const maxLengthValidate = (maxLength: number): FieldValidatorType => (value: string)=> {
    if (value && value.length > maxLength) return `Max length is ${maxLength} symbols `
    return undefined
}







