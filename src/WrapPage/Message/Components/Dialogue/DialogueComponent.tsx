import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form';


interface Props {

}

const DialogueComponent: React.FC <Props & InjectedFormProps<{}, Props>> = (props) => {
   const {handleSubmit} = props
    return <div>
        <form onSubmit = {handleSubmit}>
            <Field component={'textarea'}
                   name={'dialogueBody'}
                   placeholder={'Enter your message'}>
            </Field>
            <button>Send Message</button>
        </form>
    </div>
}

 const DialogueContainerForm = reduxForm({form: 'dialogue'})(DialogueComponent)

export default DialogueContainerForm;