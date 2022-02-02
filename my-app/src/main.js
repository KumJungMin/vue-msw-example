import { createApp } from "vue";
import App from "./App.vue";

// 개발 환경에서만 실행하면 되므로 조건부로 이 작업을 수행
//  main.js에서 가짜 서버 초기화 진행
if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

createApp(App).mount("#app");
