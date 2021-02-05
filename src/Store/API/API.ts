import axios from "axios";
import {photosType, profileType} from "../Reducer with Include Selector/ProfilePage/Profile.Reducer";

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "53463a8d-8572-4c71-942e-6aa342aad633"
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
    getProfile(userId: number) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId: number) {
        return instance.get ('profile/status/' + userId)
    },
    updateStatus(status:string) {
        return instance.put('profile/status', {
            status: status
        })
    },
    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append("image", photoFile);
    debugger
        return instance.put(`profile/photo`, formData,
            {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },

    setProfile(profile: profileType) {
        return instance.put ('profile', profile)
    }
}




export const  AuthAPI = {
    authenticator(){
       return instance.get(`auth/me` )
    },
    login(email: string, password: string, rememberMe:boolean = false){
        return instance.post (`auth/login`,{
            email, password, rememberMe
        })
    },
    logOut() {
        return instance.delete(`auth/login`)
    }
}