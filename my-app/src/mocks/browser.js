// handlers를 이용햐 서비스워커를 초기화
import { setupWorker } from "msw";
import handlers from "./handlers.js";

export const worker = setupWorker(...handlers); // worker: 가짜 서버
