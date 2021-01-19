import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../Store/Store";
import {stateProps as authProps} from "../../../../Store/Reducer with Include Selector/AuthRedirectWithHaederPage/Auth.Reducer";
import {Redirect} from "react-router-dom";
import {addNewMessage, stateProps as dialogueProps} from "../../../../Store/Reducer with Include Selector/DialoguePageRedirect/DialoguePage.Reducer";
import ChatComponent from "./ChatComponent";
import {minLengthValidate, required} from "../../../../common/formsControl/validationFormSettings/validation";
import {TextArea} from "../../../../common/formsControl/FormsControls";


interface Props { }


export const DialoguePageContainer: React.FC <Props> = ({
    ...props
                                                    }) => {


    const auth = useSelector<AppRootStateType,authProps>(store=> store.authentication)
    const dialogue = useSelector<AppRootStateType, dialogueProps>(store => store.dialoguePage)
    const dispatch = useDispatch()

    if (!auth.isAuth) return <Redirect to ={'/login'}/>



    const onSubmit = (values: any) => {
        dispatch(addNewMessage(values.dialogueBody))
    }

    return <div>
        <ChatComponent chatField = {dialogue.chatField}

        />
        < DialogueContainerForm onSubmit={onSubmit} {...props} />
    </div>



}

const minLengthArea = minLengthValidate(1)

const DialogueComponentForm: React.FC <InjectedFormProps> = (
    {
        handleSubmit
    }
) => {


    return <div>

        <form onSubmit = {handleSubmit}>
            <Field component={TextArea}
                   name={'dialogueBody'}
                   placeholder={'Enter your message'}
                   validate = {[required,minLengthArea]}
            >
            </Field>
            <button>Send Message</button>
        </form>
    </div>
}
 const DialogueContainerForm = reduxForm({form: 'dialogueAddMessageForm'})(DialogueComponentForm)

