import Manager from "./../views/manager/Manager.vue";
import Setting from "./../views/manager/Setting.vue";
import Login from "./../views/manager/Login.vue";
import PauseService from "./../views/manager/PauseService.vue";
import PrintSuccess from "./../views/manager/PrintSuccess.vue";

const routes = [
  {
    path: "/manager",
    name: "manager",
    component: Manager,
    meta: {
      title: "管理界面"
    }
  }, {
    path: "/setting",
    name: "setting",
    component: Setting,
    meta: {
      title: "参数设置"
    }
  }, {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "管理员登录"
    }
  }, {
    path: "/pauseService",
    name: "pauseService",
    component: PauseService,
    meta: {
      title: "暂停服务"
    }
  }, {
    path: "/printSuccess",
    name: "printSuccess",
    component: PrintSuccess,
    meta: {
      title: "打印成功"
    }
  }
]

export default routes;