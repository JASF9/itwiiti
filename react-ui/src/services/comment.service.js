import http from "../http-common";

class CommentService {
    
    create(id,data){
        return http.post(`/comment/${id}`,data)
    }

    get(id){
        return http.get(`/comment/${id}`)
    }
}

export default new CommentService();