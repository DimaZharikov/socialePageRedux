export const required = (value: string)  => {
if (value) return undefined
    return 'Field is required'
}


export const minLengthValidate = (minLength: number) => (value: string)=> {
    if (value && value.length === 0) return `Max length is ${minLength} symbols `
    return undefined
}
export const maxLengthValidate = (maxLength: number) => (value: string)=> {
    if (value && value.length === 0) return `Max length is ${maxLength} symbols `
    return undefined
}





