import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "82158368-9872-423e-8911-7846cfbc69d8"
    }
})


export interface itemsBackPropsToFriends {
    followed: boolean,
    id: number,
    name: string | null,
    photos: { small: null | string, large: null | string },
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
    },
    follow(friendsId: number) {
       return instance.post(`follow/${friendsId}`)


    },
    unFollow(friendsId: number) {
        return  instance.delete(`follow/${friendsId}`)
    },

}

export const ProfileAPI = {
    getProfile(userId: string) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId: string) {
        return instance.get ('profile/status/' + userId)
    },
    updateStatus(status:string) {
        return instance.put('profile/status', {
            status: status
        })
    }
}

export const  AuthAPI = {
    authenticator(){
       return instance.get(`auth/me` )
    }
}