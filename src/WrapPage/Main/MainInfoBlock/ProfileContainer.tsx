import {
    getStatus,
    getUserProfile, profileType, savePhoto, saveProfile,
    updateStatus,
} from "../../../Store/Reducer with Include Selector/ProfilePage/Profile.Reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";

import {connect} from "react-redux";

import React, {ComponentType} from "react";
import Preloader from "../../../common/preloader/Preloader";
import ProfileComponent from "./ProfileComponent";
import {AppRootStateType} from "../../../Store/Store";
import {compose} from "redux";


type PathParamsType = { userId: string }
type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number | null) => void
    getStatus: (userId: number | null) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: profileType) => Promise<any>

}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>


class ProfileConteiner extends React.Component<PropsType> {
    constructor(props: PropsType) {
        super(props);
    }


    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.authId
            if (!userId) {
                this.props.history.push('/login')
            }
        }

        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<PropsType>) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    componentWillUnmount(): void {

    }

    render() {
        if (!this.props.profile) {
            return <Preloader/>
        }
        return <ProfileComponent {...this.props}
                                 profile={this.props.profile}
                                 isOwner={Boolean(!this.props.match.params.userId)}
                                 status={this.props.status}
                                 updateStatus={this.props.updateStatus}
                                 savePhoto={this.props.savePhoto}
                                 saveProfile = {this.props.saveProfile}


        />

    }
}


const mapStateToProps = (state: AppRootStateType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authId: state.authentication.data.id,
        isAuth: state.authentication.isAuth,


    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter
)(ProfileConteiner)