import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../../../common/formsControl/FormsControls";
import {required} from "../../../common/formsControl/validationFormSettings/validation";
import style from './../../../common/formsControl/fromControlStyle.module.css';


export type formDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string


}
export type IPropsType = {
    auth: boolean,
    getAuthUserDate: (formData: formDataType) => void,
    logInThunk: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void,
    logOutThunk: () => void,
    captchaUrl? : string | null


}

export const Login: React.FC<IPropsType> = (
    {
        getAuthUserDate,   ...props
    }
) => {
    const onSubmit = (formData: formDataType) => {
        props.logInThunk(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.auth) return <Redirect to={'/profile'}/>
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl = {props.captchaUrl} {...props} />
        </div>
    )
}


export const LoginForm: React.FC<InjectedFormProps<formDataType>  & IPropsType> = (
    {
        handleSubmit, error, captchaUrl
    }
) => {
    return (


        <form onSubmit={handleSubmit}>

            {createField
            ("email", 'email', [required], Input,)}
            {createField("Password", 'password', [required], Input, {type: 'password'})}
            {createField(undefined, 'rememberMe', [], Input, {type: 'checkbox'}, 'rememberMe')}

            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField('Symbols from image', 'captcha', [required], Input, {})}


            {error ?
                <div className={style.formSummaryControl}>
                    {error}
                </div> : ''
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

//@ts-ignore
const LoginReduxForm = reduxForm<formDataType>({form: "login"})(LoginForm)