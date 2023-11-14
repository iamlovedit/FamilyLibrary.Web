import service from "@/utils/request";

export type LoginData = {
    username: string
    password: string
}

function login(data: LoginData) {
    return service.post('/auth/login', data)
}



export {

}
