import customerApi from "./customer.api";

const customerService = {
  async getCustomers(page, limit) {
    const response = await customerApi.getCustomers({
      page,
      limit,
    });

    return {
      customers: response.data.data,
      pagination: response.data.pagination,
    };
  },

  async searchCustomers(keyword) {
    const response = await customerApi.searchCustomers(keyword);

    return response.data.data;
  },

  async createCustomer(data) {
    const response = await customerApi.createCustomer(data);

    return response.data.data;
  },

  async updateCustomer(id, data) {
    const response = await customerApi.updateCustomer(id, data);

    return response.data.data;
  },

  async deleteCustomer(id) {
    await customerApi.deleteCustomer(id);
  },
};

export default customerService;
