import { createApp } from "vue";
import { createPinia } from "pinia";
import mitt from "mitt";
import type { AppEvents } from "./events";
import Aos from "aos";
import 'aos/dist/aos.css'

Aos.init({
  offset: 200,
  duration: 400,
  easing: 'ease-in-cubic',
  delay: 100,
});

export const EventManager = mitt<AppEvents>();

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
