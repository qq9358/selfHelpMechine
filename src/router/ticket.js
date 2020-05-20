import QueryTicket from "@/views/ticket/QueryTicket.vue";
import GetTicket from "@/views/ticket/GetTicket.vue";
import BuyTicket from "@/views/ticket/BuyTicket.vue";
import SelectTicket from "@/views/ticket/SelectTicket.vue";

const routes = [
  {
    path: "/queryTicket",
    name: "queryTicket",
    component: QueryTicket,
    meta: {
      title: "自助查询"
    }
  }, {
    path: "/getTicket",
    name: "getTicket",
    component: GetTicket,
    meta: {
      title: "网络取票"
    }
  }, {
    path: "/buyTicket",
    name: "buyTicket",
    component: BuyTicket,
    meta: {
      title: "票类选择"
    }
  }, {
    path: "/selectTicket/:ticketDatas",
    name: "selectTicket",
    props: true,
    component: SelectTicket,
    meat: {
      title: "选择取票"
    }
  }
]

export default routes;