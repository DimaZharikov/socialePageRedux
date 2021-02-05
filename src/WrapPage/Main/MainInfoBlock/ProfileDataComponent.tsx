import {FC} from "react";
import {contactsType, profileType} from "../../../Store/Reducer with Include Selector/ProfilePage/Profile.Reducer";
import ContactsComponent from "./ContactsComponent";

interface Props {
    profile: profileType
    isOwner: boolean
    toEditMode: ()=> void


}

const ProfileDataComponent: FC<Props> = ({
                                             toEditMode,isOwner,profile
                                         }) => {
    return (<div key={profile.userId}>
        {
            isOwner &&<button onClick={toEditMode}>Edit</button>
        }
        <div> Name : {profile.fullName}</div>
        <div> About Me : {profile.aboutMe}</div>
        <div>Looking For a Job : {profile.lookingForAJob ? 'yes' : profile.lookingForAJobDescription}</div>
        <div>
            Contacts: {Object
            .keys(profile.contacts)
            .map(key => {
                return <ContactsComponent contactTitle={key}
                                          contactValue={profile.contacts[key as keyof contactsType]}/>
            })}
        </div>
    </div>)

}

export default ProfileDataComponent