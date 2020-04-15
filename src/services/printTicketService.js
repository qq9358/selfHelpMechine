import ajax from "@/utils/reportAjax.js";
import qs from "qs";

export default {
    async print(ticket) {
        return await ajax.get("/template/TicketTemplate.ashx?" + qs.stringify(ticket)); 
        // return await ajax.get("/member/Print");
    }
}