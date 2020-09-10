import { Router } from "vue-router";
import weixinRouter from "./weixin";
import { authInstance } from "@/auth";

export const frameRoutes = [
	{
		path: "/login",
		name: "Login",
		component: () => import("@/components/frame/pages/Login.vue"),
	},
	{
		path: "/frame",
		name: "FramePages",
		component: () => import("@/components/frame/Frame.vue"),
		redirect: "noRedirect",
		children: [
			{
				path: "",
				name: "Dashboard",
				component: () => import("@/components/frame/pages/Dashboard.vue"),
			},
			{
				path: "authRule",
				name: "CigoAuthRule",
				component: () => import("@/components/frame/pages/auth/AuthRule.vue"),
			},
			{
				path: "authGroup",
				name: "CigoAuthRuleGroup",
				component: () =>
					import("@/components/frame/pages/auth/AuthRuleGroup.vue"),
			},
			{
				path: "manager",
				name: "CigoManager",
				component: () => import("@/components/frame/pages/auth/Manager.vue"),
			},
			{
				path: "user",
				name: "CigoUser",
				component: () => import("@/components/frame/pages/auth/User.vue"),
			},
			/*-----------微信管理路由------------*/
			...weixinRouter,
			/*---------------------------------*/
		],
	},
	{
		path: "/gone",
		name: "CigoGone",
		component: () => import("@/components/frame/pages/Gone.vue"),
	},
];

export function checkAuth(guard: any, router: Router) {
	let continueFlag: boolean = authInstance.init(guard).checkLogin(router);
	if (!continueFlag) {
		return;
	}
	authInstance.checkAuth(router);
}