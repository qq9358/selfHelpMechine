import ajax from "@/utils/ajax.js";
import tokenService from "@/services/tokenService.js";

export default {
  async loginFromWeChatAsync(input) {
    const response = await ajax.post("/member/LoginFromWeChatAsync", input);
    this.setMember(response);
  },
  async bindStaffAsync(input) {
    const response = await ajax.post("/member/BindStaffAsync", input);
    this.setMember(response);
  },
  async registMemberCardAsync(input) {
    return await ajax.post("/member/RegistMemberCardAsync", input);
  },
  async getElectronicMemberCardAsync() {
    let response = await ajax.get("/member/GetElectronicMemberCardAsync");
    return response.result;
  },
  async renewMemberCardAsync(id) {
    return await ajax.post("/member/RenewMemberCardAsync", {
      id: id
    });
  },
  setMember(response) {
    let member = response.result.member;
    member.permissions = response.result.permissions;
    localStorage.setItem("member", JSON.stringify(member));

    tokenService.setToken(response.result.token);
  },
  getMember() {
    const member = localStorage.getItem("member");
    if (member) {
      return JSON.parse(member);
    }
    return null;
  }
};
