import axios, { type AxiosResponse } from "axios"

const apiClient = axios.create({
    baseURL: 'https://dv-student-backend-2019.appspot.com/',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default{
    getEvent(): Promise<AxiosResponse<EventItem[]>>{
        return apiClient.get<EventItem[]>('/events')

    },
    getEventById(id:number):Promise<AxiosResponse<EventItem>>{
        return apiClient.get<EventItem>('events/'+id.toString())
    }
}