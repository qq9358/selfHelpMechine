import ajax from "./../utils/ajax.js";
import tokenService from "./tokenService.js";
import { staff } from "./../store/types.js";

export default {
  async loginAsync(input) {
    const response = await ajax.post("/staff/LoginFromAdminAsync", input);
    sessionStorage.setItem(staff.staffInfo, JSON.stringify(response.result.staff));
    tokenService.setToken(response.result.token);
    sessionStorage.setItem(staff.permissions, JSON.stringify(response.result.permissions));
    return response.result;
  },
  logout() {
    sessionStorage.removeItem(staff.staffInfo);
    tokenService.deleteToken();
    sessionStorage.removeItem(staff.permissions);
  },
  async editPasswordAsync(input) {
    return await ajax.post("/staff/EditPasswordAsync", input);
  },
  getStaffInfo() {
    const staffInfo = sessionStorage.getItem(staff.staffInfo);
    return JSON.parse(staffInfo);
  },
  async getCashierComboboxItemsAsync() {
    const response = await ajax.get("/staff/GetCashierComboboxItemsAsync");
    return response.result;
  },
  async getSalesManComboboxItemsAsync() {
    const response = await ajax.get("/staff/GetSalesManComboboxItemsAsync");
    return response.result;
  }
};
