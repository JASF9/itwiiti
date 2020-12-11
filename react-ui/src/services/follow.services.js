import http from "../http-common";

class FollowService {
    
    create(nick,data){
        return http.post(`/follow/${nick}`,data)
    }

    delete(nick){
        return http.delete(`/follow/${nick}`)
    }

    get(nick){
        return http.get(`/follow/${nick}`)
    }
}

export default new FollowService();