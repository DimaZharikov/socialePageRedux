import axios from "axios";



const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "5dff25b2-4fe3-496c-985e-2645be233da5"
    }
})


export interface itemsBackPropsToFriends{
    followed: boolean,
    id: number,
    name: string | null,
    photos: {small: null | string, large: null | string},
    status: null | string,
    uniqueUrlName: null | string,
}


export interface FriendsPropsTypeAPI {
    items: Array<itemsBackPropsToFriends>,
    totalCount: number,
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


