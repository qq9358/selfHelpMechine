import ajax from "@/utils/ajax.js";

export default {
  async getOrderNoticeAsync() {
    let response = await ajax.get("setting/GetOrderNoticeAsync");
    return response.result;
  },
  async getOptionsAsync() {
    let options = localStorage.getItem("options");
    if (options) {
      return JSON.parse(options);
    }
    return await this.getSettingsFromWeChatAsync();
  },
  async getSettingsFromWeChatAsync() {
    const response = await ajax.get("/setting/GetSettingsFromWeChatAsync");
    localStorage.setItem("options", JSON.stringify(response.result));
    return response.result;
  },
  async getWxJsApiSignatureAsync(url) {
    const response = await ajax.get(`setting/GetWxJsApiSignature?url=${url}`);
    return response.result;
  },
  async getWxLoginUrl(url) {
    const response = await ajax.get(
      `setting/GetWxLoginUrl?url=${encodeURIComponent(url)}`
    );
    return response.result;
  }
};
