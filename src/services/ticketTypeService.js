import ajax from "@/utils/ajax.js";

export default {
  async getTicketTypesForWeiXinSaleAsync(input) {
    let response = await ajax.post("/ticketType/GetTicketTypesForWeiXinSaleAsync", input);
    return response.result;
  },
  async getTicketTypeDescriptionAsync(ticketTypeId) {
    let response = await ajax.get(
      `/ticketType/GetTicketTypeDescriptionAsync?ticketTypeId=${ticketTypeId}`
    );
    return response.result;
  },
  async getTicketTypeForWeiXinSaleAsync(ticketTypeId) {
    let response = await ajax.get(
      `/ticketType/GetTicketTypeForWeiXinSaleAsync?ticketTypeId=${ticketTypeId}`
    );
    return response.result;
  },
  async getTicketTypeChangCiComboboxItemsAsync(ticketTypeId, date) {
    let response = await ajax.get(
      `/ticketType/GetTicketTypeChangCiComboboxItemsAsync?ticketTypeId=${ticketTypeId}&date=${date}`
    );
    return response.result;
  },
  async getTicketTypesForLocalSaleAsync(input) {
    const response = await ajax.post("/ticketType/GetTicketTypesForLocalSaleAsync", input);
    return response.ressult;
  },
  async getTicketTypesForSelfHelpAsync(input) {
    const response = await ajax.post("/ticketType/GetTicketTypesForSelfHelpAsync", input);
    return response.result;
  }
};
