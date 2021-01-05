import React, {useEffect, useState} from 'react'


interface Props {

}

const getDigitsString = (num: number) => num < 10 ? '0' + num : num

const ClockComponent: React.FunctionComponent<Props> = () => {
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const intervalID = setInterval(() => {
            setDate(new Date())
        }, 1000);
        return () => {
            clearInterval(intervalID)
        }
    }, [])


    return <div>
        <span>{getDigitsString(date.getHours())}</span>
        :
        <span>{getDigitsString(date.getMinutes())}</span>
        :
        <span>{getDigitsString(date.getSeconds())}</span>
    </div>

}

export default ClockComponent
