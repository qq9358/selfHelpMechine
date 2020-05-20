import ajax from "@/utils/ajax.js";

export default {
  async getNetPayOrderAsync(listNo) {
    let response = await ajax.get(`/payment/GetNetPayOrderAsync?listNo=${listNo}`);
    return response.result;
  },
  async jsApiPayAsync(listNo) {
    let response = await ajax.post(`/payment/JsApiPayAsync?listNo=${listNo}`);
    return response.result;
  },
  async nativePayAsync(input) {
    let response = await ajax.post(`/payment/NativePayAsync`, input);
    return response.result;
  }
};
