import React from 'react'
import {Field, WrappedFieldInputProps, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import style from './fromControlStyle.module.css'


interface formControlPropsOfParams {
    meta: WrappedFieldMetaProps,
    input: WrappedFieldInputProps
}


const FormControl: React.FC<formControlPropsOfParams> = (
    {
        meta: {touched, error}, children
    }) => {
    const hasError = touched && error
    return (
        <div className={style.formControl + "" + (hasError ? style.error : '')}>

            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )

}


export const TextArea: React.FC<WrappedFieldProps> = (props) => {
    const {input, ...restProps} = props
    return <FormControl {...props}><textarea{...input} {...restProps}/></FormControl>

}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, ...restProps} = props
    return <FormControl {...props}><input{...input} {...restProps}/></FormControl>

}

export const createField = (placeholder: string | undefined,
                            name: string,
                            validate: any,
                            component: React.FC<WrappedFieldProps>,
                            props = {}, text = ''
) => (
    <div>
        <Field
            placeholder={placeholder}
            name={name}
            component={component}
            validate={validate}
            {...props}
        /> {text}
    </div>
)




