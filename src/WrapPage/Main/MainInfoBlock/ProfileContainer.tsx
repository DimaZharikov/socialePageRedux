import {getUserProfile, profileType} from "../../../Store/Profile.Reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";

import {connect} from "react-redux";
import {Dispatch} from "redux";
import React from "react";
import Preloader from "../../../common/preloader/Preloader";
import ProfileComponent from "./ProfileComponent";



interface Props {
    profile: profileType
    getUserProfile: (userId: string) => void
}



const mapStateToProps = (state: { profilePage: { profile: profileType } }) => {
    return {
        profile: state.profilePage.profile
    }
}


class ProfileConteiner extends React.Component<RouterPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '1';
        }
        this.props.getUserProfile(userId)
    }


    render() {
        if (!this.props.profile) {
            return <Preloader/>
        }
        return <ProfileComponent
            profile={this.props.profile}
            getUserProfile={this.props.getUserProfile}
        />

    }
}

type PathParamsType = {userId : string}
type RouterPropsType = RouteComponentProps<PathParamsType> & Props

const withUrlConteinerComponent = withRouter(ProfileConteiner)

export default connect(mapStateToProps, {getUserProfile})(withUrlConteinerComponent)