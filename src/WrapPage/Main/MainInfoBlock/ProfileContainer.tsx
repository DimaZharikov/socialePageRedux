import {getStatus, getUserProfile, profileType, updateStatus,} from "../../../Store/Reducer with Include Selector/ProfilePage/Profile.Reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";

import {connect} from "react-redux";

import React from "react";
import Preloader from "../../../common/preloader/Preloader";
import ProfileComponent from "./ProfileComponent";



interface Props {
    status: string
    profile: profileType
    getUserProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string)=> void
    userId: string | null

}



const mapStateToProps = (state: { profilePage: { status: string ,profile: profileType } }) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,

    }
}


class ProfileConteiner extends React.Component<RouterPropsType> {

    componentDidMount() {

        let userId = this.props.match.params.userId
        if (!userId) {
            userId = `${this.props.userId}`
            if (!userId) {
                this.props.history.push('/login')
            }
        }

        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }


    render() {
        if (!this.props.profile) {
            return <Preloader/>
        }
        return <ProfileComponent
            profile={this.props.profile}
            getUserProfile={this.props.getUserProfile}
            status = {this.props.status}
            updateStatus={this.props.updateStatus}


        />

    }
}

type PathParamsType = {userId : string}
type RouterPropsType = RouteComponentProps<PathParamsType> & Props

const withUrlConteinerComponent = withRouter(ProfileConteiner)




export default connect(mapStateToProps, {getUserProfile,getStatus,updateStatus})(withUrlConteinerComponent)