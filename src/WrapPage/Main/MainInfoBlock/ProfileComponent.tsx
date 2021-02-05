import React, {ChangeEvent, FunctionComponent, memo, useState} from 'react'
import {profileType} from "../../../Store/Reducer with Include Selector/ProfilePage/Profile.Reducer";
import ProfileStatusComponent from "../MainInputStatus/ProfileStatusComponent";
import ProfileDataComponent from "./ProfileDataComponent";
import ProfileDataFormReduxForm from "./CorrectedProfileDataComponents";

interface Props{
    profile: profileType
    getUserProfile: (userId: number)=> void,
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: profileType) => Promise<any>


}

 const ProfileComponent: FunctionComponent<Props> = memo (({profile,status,updateStatus,
                                                                           savePhoto,isOwner, saveProfile}) => {


     const [editMode, setEditMode] = useState<boolean>(false)

     const onMainPhotoSelected = (e:ChangeEvent<HTMLInputElement>) => {
        if( e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
     }

     const toEditMode = () => {
         setEditMode(true)

     }

     const onSubmit = (formData: profileType) => {
              saveProfile(formData).then (
                  ()=> setEditMode(false)
              )


     }

    return(<div key = {profile.userId}>

        <img src={profile.photos.large || "https://img.icons8.com/ios-glyphs/100/000000/change-user-male.png"} alt={` there was ${profile.fullName}`}/>
        {isOwner && <input type="file"  onChange = {onMainPhotoSelected}/>}
        <ProfileStatusComponent   status = {status}  updateStatus = {updateStatus}     />
        { editMode ?
            <ProfileDataFormReduxForm initialValues={profile} profile = {profile} onSubmit = {onSubmit}/>
            :
            <ProfileDataComponent profile = {profile} isOwner = {isOwner} toEditMode = {toEditMode}/>
        }


    </div>)
})




export default ProfileComponent;

