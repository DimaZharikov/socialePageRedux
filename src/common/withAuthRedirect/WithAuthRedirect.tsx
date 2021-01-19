import {Redirect} from "react-router-dom";
import React from "react";
import {stateProps as authProps} from "../../Store/Reducer with Include Selector/AuthRedirectWithHaederPage/Auth.Reducer";


interface Props {
    authentication: authProps
}

export const withAuthRedirect = (Component: React.ComponentType) => {
    class RedirectComponent extends React.Component<Props> {
        render() {
            if (this.props.authentication.isAuth) return <Redirect to={'logIn'}/>
            return <Component {...this.props}/>;
        }
    }
    return RedirectComponent;
}