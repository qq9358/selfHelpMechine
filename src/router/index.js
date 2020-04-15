import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/home/Index.vue'
import Print from "@/views/home/Print.vue"
import ticketRoutes from "./ticket.js"
import managerRoutes from "./manager.js"

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/print',
      name: 'print',
      component: Print
    },
    ...ticketRoutes,
    ...managerRoutes
  ]
})
