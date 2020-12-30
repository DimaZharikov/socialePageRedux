import axios from "axios";
import {stateType as friendsStateType} from "../FriendsPage.Reducer";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "5dff25b2-4fe3-496c-985e-2645be233da5"
    }
})


interface itemsBackProps{
    name: string,
    id: number,
    photos: {
        small: null | string
        large: null | string
            }
    status: null | string
    followed: boolean

}


export interface FriendsPropsTypeAPI {
    items: Array<itemsBackProps>
    totalCount: number
    error: null | string
}




export const FriendsAPI = {

     getUsers(currentPage: number, pageSize: number) {
        return instance.get<FriendsPropsTypeAPI>(`users?page=${currentPage}&count=${pageSize}`,
            {withCredentials: true})
            .then(response => {
                return response.data.items
            })
    }

}


