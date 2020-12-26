import {profileType, setUserProfile} from "../../../Store/Profile.Reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";

import {connect} from "react-redux";
import {Dispatch} from "redux";
import React from "react";
import axios from "axios";
import Preloader from "../../../common/preloader/Preloader";
import ProfileComponent from "./ProfileComponent";


interface Props {
    profile: profileType
    onSetUserProfile: (profile: profileType) => void
}



const mapStateToProps = (state: { profilePage: { profile: profileType } }) => {
    return {
        profile: state.profilePage.profile
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onSetUserProfile: (profile: profileType) => {
            dispatch(setUserProfile(profile))
        }
    }
}

class ProfileConteiner extends React.Component<RouterPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '1';
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                this.props.onSetUserProfile(response.data)
            })
    }


    render() {
        if (!this.props.profile) {
            return <Preloader/>
        }
        return <ProfileComponent
            profile={this.props.profile}
            onSetUserProfile={this.props.onSetUserProfile}
        />

    }
}

type PathParamsType = {userId : string}
type RouterPropsType = RouteComponentProps<PathParamsType> & Props

const withUrlConteinerComponent = withRouter(ProfileConteiner)

export default connect(mapStateToProps, mapDispatchToProps)(withUrlConteinerComponent)