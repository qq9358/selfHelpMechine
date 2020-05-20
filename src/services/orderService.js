import ajax from "@/utils/ajax.js";
import qs from "qs";

export default {
  async getOrdersAsync(input) {
    let response = await ajax.post("/order/GetOrdersAsync", qs.stringify(input));
    return response.result;
  },
  async getMemberOrdersForMobileAsync(input) {
    let response = await ajax.post("/order/GetMemberOrdersForMobileAsync", input);
    return response.result;
  },
  async getMemberOrderForMobileAsync(listNo) {
    const response = await ajax.get(`/order/GetMemberOrderForMobileAsync?listNo=${listNo}`);
    return response.result;
  },
  async getOrderInfoForMobileAsync(listNo) {
    let response = await ajax.post("/order/GetOrderFullInfoAsync", {
      listNo
    });
    return response.result;
  },
  async getRefundApplysWithStatusDetailAsync(listNo) {
    const response = await ajax.get(`/order/GetRefundApplysWithStatusDetailAsync?listNo=${listNo}`);
    return response.result;
  },
  async getOrderOptionsAsync() {
    let response = await ajax.get("/order/GetOrderOptionsAsync");
    return response.result;
  },
  async getOrdersForExplainAsync(customerName) {
    let response = await ajax.post("/order/GetOrdersForExplainAsync", {
      customerName
    });
    return response.result;
  },
  async getGroupOrdersForConsumeAsync(queryText) {
    let response = await ajax.post("/order/GetGroupOrdersForConsumeAsync", {
      queryText
    });
    return response.result;
  },
  async createWeiXinOrderAsync(input) {
    const response = await ajax.post("/order/CreateWeiXinOrderAsync", input);
    return response.result;
  },
  async createIndividualOrderAsync(input) {
    return await ajax.post("/order/CreateIndividualOrderAsync", input);
  },
  async createGroupOrderAsync(input) {
    return await ajax.post("order/CreateGroupOrderAsync", input);
  },
  async cancelOrderAsync(listNo) {
    return await ajax.post("/order/CancelOrderAsync", {
      listNo
    });
  },
  async applyRefundAsync(input) {
    return await ajax.post("/order/ApplyRefundAsync", input);
  },
  async consumeOrderFromMobileAsync(listNo) {
    return await ajax.post("/order/ConsumeOrderFromMobileAsync", {
      listNo
    });
  },
  async checkOutOrderFromMobileAsync(listNo) {
    return await ajax.post("/order/CheckOutOrderFromMobileAsync", {
      listNo
    });
  },
  async createSelfHelpOrderAsync(input) {
    let response = await ajax.post("/order/CreateSelfHelpOrderAsync", input);
    return response.result;
  },
  async getSelfHelpTicketGroundAsync(input) {
    let response = await ajax.post("/order/GetSelfHelpTicketGroundAsync", input);
    return response.result;
  },
  async getSelfHelpOrderTicketAsync(input) {
    let response = await ajax.post("/order/GetSelfHelpOrderTicketAsync", input);
    return response.result;
  },
  CreateOrderInput: function () {
    this.travelDate = "";
    this.adultQuantity = 0;
    this.adults = [];
    this.childrenQuantity = 0;
    this.children = [];
    this.contact = {
      mobile: ""
    };
  }
};
