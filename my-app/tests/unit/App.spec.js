// our test subject
import App from "../../src/App";

// libraries
import { setupServer } from "msw/node";
import { render, screen, waitFor } from "@testing-library/vue";
import "@testing-library/jest-dom";

// MSW handlers
import handlers from "../../src/mocks/handlers";

const server = setupServer(...handlers); // 가짜 서버 생성

// 테스트 전에 서버를 시작하고 테스트가 끝나면 서버를 닫아야 합니다
// NEW
beforeAll(() => {
  server.listen();
});

// NEW
afterAll(() => {
  server.close();
});

describe("App", () => {
  it("calls fetchMessage once and displays a message", async () => {
    render(App);
    await waitFor(() => {
      expect(screen.getByText("it works :)")).toBeInTheDocument();
    });
  });
});
