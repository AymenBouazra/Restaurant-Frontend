import http from '../utils/http'

const getAllOrder = async () => {
    return await http.get("/order");
}


const confirmOrder = (id, data) => {
    return http.put(`/order/${id}`, data);
};

const removeOne = id => {
    return http.delete(`/order/${id}`);
};
const getOne = id => {
    return http.get(`/order/${id}`);
};

const createOne = data => {
    return http.post("/order", data);
};

const OrderService = {
    getAllOrder,
    confirmOrder,
    removeOne,
    getOne,
    createOne
}

export default OrderService