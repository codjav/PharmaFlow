import categoryApi from "./category.api";

const categoryService = {

    async getCategories() {

        const response =
            await categoryApi.getCategories();

        return response.data.data;

    },

    async createCategory(name) {

        const response =
            await categoryApi.createCategory({
                name,
            });

        return response.data.data;

    }

};

export default categoryService;