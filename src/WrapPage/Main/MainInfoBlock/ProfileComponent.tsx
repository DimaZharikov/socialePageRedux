import React from 'react'
import {profileType} from "../../../Store/Reducer with Include Selector/ProfilePage/Profile.Reducer";
import ProfileStatusComponent from "../MainInputStatus/ProfileStatusComponent";

interface Props{
    profile: profileType
    getUserProfile: (userId: string)=> void,
    status: string
    updateStatus: (status: string) => void



}

 const ProfileComponent: React.FunctionComponent<Props> = React.memo (({profile,status,updateStatus}) => {
    return(<div key = {profile.userId}>
        <div> Name : {profile.fullName}</div>
        <img src={profile.photos.large} alt=""/>
        <ProfileStatusComponent status = {status}
                                updateStatus = {updateStatus}
        />
        <div> About Me : {profile.aboutMe}</div>
        <div>Looking For a Job : {profile.lookingForAJob? 'yes' : profile.lookingForAJobDescription}</div>
        <div>
            Contacts:
            facebook: {profile.contacts.facebook},
            website: {profile.contacts.website},
            vk: {profile.contacts.vk},
            twitter: {profile.contacts.twitter},
            instagram: {profile.contacts.instagram},
            youtube: {profile.contacts.youtube},
            github: {profile.contacts.github},
            mainLink: {profile.contacts.mainLink}
        </div>
    </div>)
})


export default ProfileComponent;

