// 모의 API의 동작을 지정하는 곳
// 모든 "가짜" API 요청 핸들러를 handlers.js 안에 넣을 것
import { rest } from "msw";

export default [
  rest.get("/message", (req, res, ctx) => {
    return res(
      ctx.json({
        message: "it works :)",
      })
    );
  }),
];
