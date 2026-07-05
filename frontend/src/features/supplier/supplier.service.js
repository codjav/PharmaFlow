import supplierApi from "./supplier.api";

const supplierService = {
  async getSuppliers(page = 1, limit = 10) {
    const response = await supplierApi.getSuppliers(page, limit);

    return {
      suppliers: response.data.data,
      pagination: response.data.pagination,
    };
  },

  async getSupplier(id) {
    const response = await supplierApi.getSupplier(id);

    return response.data.data;
  },

  async createSupplier(data) {
    const response = await supplierApi.createSupplier(data);

    return response.data.data;
  },

  async updateSupplier(id, data) {
    const response = await supplierApi.updateSupplier(id, data);

    return response.data.data;
  },

  async deleteSupplier(id) {
    await supplierApi.deleteSupplier(id);
  },

  async searchSuppliers(keyword) {
    const response = await supplierApi.searchSuppliers(keyword);

    return response.data.data;
  },

  async getSupplierStats() {
    const response = await supplierApi.getSupplierStats();

    return response.data.data;
  },

  async getTopSuppliers() {
    const response = await supplierApi.getTopSuppliers();

    return response.data.data;
  },

  async getSuppliersWithDue() {
    const response = await supplierApi.getSuppliersWithDue();

    return response.data.data;
  },
};

export default supplierService;
