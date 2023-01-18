import http from "./httpServices";

export const getProducts = () => {
    return http.get("/products")
}
export const getOneProduct = (id) => {
    return http.get(`/products/${id}`)
}
export const postProduct = (data) => {
    return http.post("/products", data)
}
export const putProduct = (id, data) => {
    return http.put(`/products/${id}`, data)
}
export const deleteProduct = (id) => {
    return http.delete(`/products/${id}`)
}

