import React from "react";
import { Redirect } from "react-router-dom";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

export type formDataType = {
    email: string
    password: string
    rememberMe: boolean
}
export type IPropsType = {
    auth: boolean
    getAuthUserDate: (formData: formDataType) => void

}

export const Login: React.FC< IPropsType> = (
    {
        getAuthUserDate, ...props
    }
) => {
    const onSubmit = (formData: formDataType) => {
        getAuthUserDate(formData)
    }
    if( props.auth ) return <Redirect to={'/profile'} />
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} {...props} />

        </div>
    )
}
export const LoginForm: React.FC<InjectedFormProps<formDataType> > = (
    {
        handleSubmit
    }
) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field type="text" placeholder={"email"} name={'email'} component={'input'}/>
            </div>
            <div>
                <Field type="text" placeholder={"Password"} name={'password'} component={'input'}/>
            </div>
            <div>
                <Field type="checkbox" name={"rememberMe"} component={'input'}/>remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<formDataType>({form: "login"})(LoginForm)