import React from "react";
import { connect } from "react-redux";
import {Login} from "./LogInAppComponent";
import {AppRootStateType} from "../../../Store/Store";
import {getAuthUserDate} from "../../../Store/Auth.Reducer";



const mapStateToProps = (state: AppRootStateType) => ({
    auth: state.authentication.isAuth

})

export default connect(mapStateToProps, {getAuthUserDate})(Login)