import {profileType} from "../../../Store/Reducer with Include Selector/ProfilePage/Profile.Reducer";
import {createField, GetStringKeys, Input, TextArea} from "../../../common/formsControl/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import {FC} from "react";


type PropsType = {
    profile: profileType
}
type ProfileTypeKeys = GetStringKeys<profileType>

const ProfileDataForm: FC<InjectedFormProps<profileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        <div><button>save</button></div>
        {error && <div>
            {error}
        </div>
        }
        <div>
            <b>Full name</b>: {createField("Full name", "fullName", [], Input)}
        </div>
        <div>
            <b>Looking for a job</b>: {createField("", "lookingForAJob", [], Input, {type: "checkbox"} )}
        </div>

        <div>
            <b>My professional skills</b>:
            { createField("My professional skills", "lookingForAJobDescription", [], TextArea  )}
        </div>


        <div>
            <b>About me</b>:
            { createField("About me", "aboutMe", [], TextArea  )}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <div key={key}>
                {/* todo: create some solution for embedded objects */}
                <b>{key}: {createField(key, "contacts." + key, [], Input)}</b>
            </div>
        })}
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm<profileType, PropsType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;