import React from "react";
import { connect } from "react-redux";
import {Login} from "./LogInAppComponent";
import {AppRootStateType} from "../../../Store/Store";
import {getAuthUserDate, logInThunk, logOutThunk} from "../../../Store/Reducer with Include Selector/AuthRedirectWithHaederPage/Auth.Reducer";



const mapStateToProps = (state: AppRootStateType) => ({
    auth: state.authentication.isAuth,
    captchaUrl: state.authentication.captcha
})

export default connect(mapStateToProps, {
    logInThunk, logOutThunk, getAuthUserDate})(Login)