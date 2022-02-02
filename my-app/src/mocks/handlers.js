// 모의 API의 동작을 지정하는 곳
import { rest } from "msw";

export default [
  rest.get("/message", (req, res, ctx) => {
    return res(
      ctx.json({
        message: "it works!",
      })
    );
  }),
];
