import http from '../utils/http'

const getAllFood = async () => {
    return await http.get("/food");
}
const updateOne = (id, data) => {
    return http.put(`/food/${id}`, data);
};

const removeOne = id => {
    return http.delete(`/food/${id}`);
};
const getOne = id => {
    return http.get(`/food/${id}`);
};

const createOne = data => {
    return http.post("/food", data);
};

const FoodService = {
    getAllFood,
    updateOne,
    removeOne,
    getOne,
    createOne
}

export default FoodService