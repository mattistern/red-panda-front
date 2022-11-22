import http from "../http-common";

class ProductDataService {
  getAll() {
    return http.get("/products");
  }

  create(data) {
    return http.post("/products", data);
  }

  update(id, data) {
    console.log('UPDATE :: ', id)
    return http.put(`/products/_id:${id}`, data);
  }
}

export default new ProductDataService();