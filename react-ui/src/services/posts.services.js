import http from "../http-common";

class PostsService {
    
    create(data){
        return http.post("/post/create",data)
    }

    update(id,data){
        return http.put(`/post/${id}`,data)
    }

    delete(id){
        return http.delete(`/post/${id}`)
    }

    getAll(nick){
        return http.get(`/post/all/${nick}`)
    }

    get(id){
        return http.get(`/post/${id}`)
    }
}

export default new PostsService();