import api from "@/api/axios";

const categoryApi = {

    getCategories() {
        return api.get("/categories");
    },

    createCategory(data) {
        return api.post("/categories", data);
    }

};

export default categoryApi;