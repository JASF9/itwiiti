import http from "../http-common";

class UserService {
    
    create(data){
        return http.post("/user/create",data)
    }

    update(nick,data){
        return http.put(`/user/${nick}`,data)
    }

    delete(nick){
        return http.delete(`/user/${nick}`)
    }

    search(text){
        return http.get(`/user/search/${text}`)
    }

    getAll(){
        return http.get('/user/all')
    }

    get(){
        return http.get("/user")
    }

    photo(nick,data){
        return http.put(`/user/photo/${nick}`,data)

    }
}

export default new UserService();