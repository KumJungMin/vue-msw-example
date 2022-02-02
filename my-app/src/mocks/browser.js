// msw에서 제공하는 서비스워커를 이용해, handlers를 인자로 넘김
// 서비스워커: 브라우저가 백그라운드에서 실행하는 스크립트, 오프라인에서도 서비스를 사용할 수 있도록 함
// https://so-so.dev/web/service-worker/
// handlers.js 의 코드를 사용하여 실제 모의 서비스 작업자를 초기화하는 장소가 될 것 입니다.
// MSW는 개발과 테스트 모두에서 사용할 수 있으므로 두 환경의 초기화는 별도로 유지해야 하며, browsers.js 는 개발용입니다.

import { setupWorker } from "msw";
import handlers from "./handlers.js";

export const worker = setupWorker(...handlers); // worker: 가짜 서버
