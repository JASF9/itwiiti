import http from "../http-common";

class LikeService {
    
    createLike(id,data){
        return http.post(`/like/${id}`)
    }

    createDislike(id,data){
        return http.post(`/dislike/${id}`)
    }

    updateLike(id,data){
        return http.put(`/like/${id}`,data)
    }

    updateDislike(id,data){
        return http.put(`/dislike/${id}`,data)
    }

    get(id){
        return http.get(`/like/${id}`)
    }
}

export default new LikeService();