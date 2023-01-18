import http from "./httpServices";

export const getCategories = () => {
    return http.get("/categories")
}
export const getOneCategory = (id) => {
    return http.get(`/categories/${id}`)
}
export const postCategory = (data) => {
    return http.post("/categories", data)
}
export const putCategory = (id, data) => {
    return http.put(`/categories/${id}`, data)
}
export const deleteCategory = (id) => {
    return http.delete(`/categories/${id}`)
}

