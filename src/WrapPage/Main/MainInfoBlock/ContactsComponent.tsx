import {FC} from "react";


type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}
const ContactsComponents: FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div><b>{contactTitle}</b>: {contactValue}</div>
}

export default ContactsComponents