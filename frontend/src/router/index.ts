import { AuctionView, FundView, HomeView } from "@/views";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/fund", name: "fund", component: FundView },
    { path: "/auction", name: "auction", component: AuctionView },
  ],
});

export default router;
