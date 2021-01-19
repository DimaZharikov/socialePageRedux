import React from "react";
import {Redirect} from "react-router-dom";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../../common/formsControl/FormsControls";
import {required} from "../../../common/formsControl/validationFormSettings/validation";
import style from './../../../common/formsControl/fromControlStyle.module.css';




export type formDataType = {
    email: string
    password: string
    rememberMe: boolean


}
export type IPropsType = {
    auth: boolean,
    getAuthUserDate: (formData: formDataType) => void,
    logInThunk:(email: string, password: string, rememberMe: boolean) => void,
    logOutThunk: () => void,




}

export const Login: React.FC< IPropsType> = (
    {
        getAuthUserDate,  ...props
    }
) => {
    const onSubmit = (formData: formDataType) => {
        props.logInThunk(formData.email, formData.password, formData.rememberMe)
    }
    if( props.auth ) return <Redirect to={'/profile'} />
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}{...props} />
        </div>
    )
}
export const LoginForm: React.FC<InjectedFormProps<formDataType> > = (
    {
         handleSubmit,error
    }
) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field type="text"
                       placeholder={"email"}
                       name={'email'}
                       component={Input}
                       validate={[required]}
                />
            </div>
            <div>
                <Field type="password" placeholder={"Password"} name={'password'} component={Input}
                       validate={[required]}/>
            </div>
            <div>
                <Field type="checkbox" name={"rememberMe"} component={'input'}/>remember me
            </div>
            { error?
                <div className={style.formSummaryControl}>
                {error}
            </div> :  ''
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<formDataType>({form: "login"})(LoginForm)