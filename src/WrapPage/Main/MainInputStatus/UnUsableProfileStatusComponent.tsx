import React, {ChangeEvent, useEffect, useState} from 'react'


interface Props {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusComponent: React.FC <Props> = ({
                                                      status,
                                                      updateStatus
                                                  }) => {


    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [isStatus, setIsStatus] = useState<string > (status)

    useEffect(()=> {
        debugger
        updateStatus(status)
    },[status])
    const isActiveMode = () => {
        setIsEditMode(true)
    };

    const isDeActiveMode = () => {
        setIsEditMode(false)
    };

    const onChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
        setIsStatus(event.currentTarget.value)
    }



    return (<div>
        {!isEditMode ?
            <div>
                <span onDoubleClick={isActiveMode}>{isStatus  || 'set a status message'}</span>
            </div>
            :
            <div onClick={isDeActiveMode}>
                <input value={isStatus}
                    onChange = {onChangeStatus}
                    onBlur={isDeActiveMode}
                    autoFocus={true}

                />
            </div>
        }


    </div>)
}

export default ProfileStatusComponent