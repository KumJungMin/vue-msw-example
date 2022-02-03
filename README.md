# 1. Mock Service Worker(MSW)?

## 1) MSW란?

<a href="https://mswjs.io/docs/#request-flow-diagram](https://mswjs.io/docs/#request-flow-diagram"><image width="50%" src="https://github.com/KumJungMin/vue-msw-example/blob/main/my-app/src/img/msw-flow.png" /></a>

- [MSW](https://mswjs.io/)는 서비스 워커(*아래에서 설명*)를 사용하여, HTTP 요청을 가로채 모의 응답을 보내는 API 도구이다.
- MSW를 사용하면 사용자가 요청하는 것처럼 API를 구성할 수 있어, 실제 백엔드 API가 완성되어도 코드를 변경할 필요가 없다.

<br/>

> 🙄 그런데, MSW를 사용하는 이유는 무엇일까? 백엔드 API를 그대로 쓰면 안될까?

- 프로젝트를 진행하다보면, 백엔드 개발이 예상보다 길어지는 경우가 발생한다.
- 이 경우 프론트는 UI적인 개발을 먼저할 수 있지만, 백엔드 개발을 기다리면서 시간을 낭비하는 게 좋지 않다.
- 그러므로 프론트에서는 백엔드로부터 API 요청&응답 형태를 요청받아 MSW로 작업하는게 좋다.

<br/><br/>

## 2) 서비스 워커란?

> 🤔 앞서 언급했듯이 MSW는 서비스 워커를 이용하는데, 그렇다면 이 서버스 워커는 무엇일까?


- [서비스 워커](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)를 간단히 요약하면 **브라우저가 백그라운드에서 실행하는 스크립트**이다.
- 그렇다면 서비스 워커의 특징이 무엇일까 궁금할텐데, 아래에 정리해두었으나 확인해보자 🙂


### (1) 서비스워커는 웹 사이트와 별개로 동작한다.

- 서비스워커는 웹사이트와 별개로 작동하기에, 웹 사이트의 라이프 사이클을 따르지 않는다.
- 웹페이지가 닫히더라도 자동으로 비활성화되지 않는다.
- 단, DOM이나 window요소에 접근할 수는 없다.

<br/>

### (2) 웹사이트의 요청을 가로챌 수 있다.

- 서비스워커는 연결된 웹사이트를 제어 및 탐색할 수 있으며, 리소스 요청을 가로채 수정할 수 있다.

<br/>

### (3) 웹사이트와 네트워크의 중간다리 역할을 할 수  있다.

- 웹 서비스와 브라우저 & 네트워크 사이에서 프록시 서버의 역할을 할 수 있다.
    
    *(프록시 서버란, 클라이언트와 서버 사이에서 데이터를 전달해 주는 서버)*
 
 <br/>
 

### (4) 리소스를 캐싱할 수 있다.

- 리소스를 캐싱할 수 있기에, 불필요한 API 요청을 줄일 수 있다.

<br/>

### (5) 사용 예시

> 서비스 워커는 아래와 같은 경우에 이용할 수 있다!

- 백그라운드 데이터 동기화가 가능하기에 메시지 전송 중 컴퓨터가 오프라인이 되어도, 다시 온라인 상태가 되면 작업 마무리가 가능하다.
- API 요청을 가로채 모의 응답을 전송할 수 있다.
- 인터넷 연결이 끊겨도 캐시가 존재하는 한, 브라우저에 정보를 보여줄 수 있다.
- 브라우저 창이 닫혀도 동작하기에, 푸시 알람을 구현할 수 있다.


<br/><br/>

---

<br/><br/>

# 2. MSW를 Vue에서 사용해보기

> 😎 Vue에서 MSW를 이용해 모의 서버를 만들어보자!

## 1) 기본 설정하기

### (1) vue앱 설치하기

- 아래 명령어를 사용해 vue 프로젝트를 생성한다.

```bash
vue create my-app
```

<br/>

### (2) 필요한 라이브러리 설치하기

- api 통신을 위한 axios를 설치한다.

```bash
npm install axios
```

<br/><br/>

## 2) msw사용 전 api 요청 테스트하기

### (1) **fetchers.js 생성하기**

- `/src/services/fetchers.js` 파일을 생성한다.
- 이 파일은 axios를 사용해, 모의서버로부터 요청을 보내고 그에 대한 모의 응답을 가져온다.

```js
// fetchers.js
import axios from 'axios'

export const fetchMessage = async function (){
  const response = await axios.get('/message');
  return response.data.message;
}
```

<br/>

### (2) **App.vue에서 응답 데이터 확인하기**

- `src/App.vue`에서 `fetchers.js`의 `fetchMessage` 함수를 사용해 응답 결과를 확인한다.

```js
<template>
  <p>{{ message }}</p>
</template>

<script>
import { fetchMessage } from "./services/fetchers.js";

export default {
  data() {
    return {
      message: "",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.message = await fetchMessage();
      } catch (e) {
        this.message = "server error";
      }
    },
  },
};
</script>
```

<br/>

### (3) 앱 실행해서 확인해보기

- npm 명령어를 사용해 vue 프로젝트를 구동시킬 수 있다.

```bash
npm run serve
```

<br/>

- 현재는 `fetchMessage`에는 유효한 api call이 없기에 **server error** 문구가 뜬다.

<image src="https://github.com/KumJungMin/vue-msw-example/blob/main/my-app/src/img/serve-error.png" width="70%"/>


<br/><br/>

## 4) msw를 사용해 가상서버 만들기

> 🙂 모의 요청을 보내는 fetchers.js를 생성했으니, 본격적으로 msw를 이용해 가상응답을 지정해보자!

### (1) msw 설치하기

- npm 명령어를 사용해 msw를 설치한다.

```bash
npm install msw
```

<br/>

### (2) mocks 폴더 추가하기

- src폴더 내부에 **mocks**폴더를 생성하는데, 이 폴더에는 **모의 API 관련 코드**를 넣을 예정이다.
- src/mocks 폴더에 `handlers.js`, `browser.js` 파일을 추가한다.

| handlers.js | 모의 API 동작을 지정하는 곳이다. (모의 API 요청 핸들러를 여기에 정의) |
| --- | --- |
| browser.js | handlers.js의 코드를 이용해, 서비스워커를 초기화하는 곳이다. |

<br/>

**A. *src/mocks/handlers.js***

- 모의 API 동작 관련 코드를 정의한다.
- msw의 `rest`를 이용해 **/message**로 **get**요청을 보냈을 때, 응답할 **JSON** 메시지를 정의한다.

```js
import { rest } from "msw";

export default [
  rest.get("/message", (req, res, ctx) => {  // /message로 get 요청이 오면
    return res(
      ctx.json({
        message: "it works!",                // 응답할 메시지를 it works로 정의
      })
    );
  }),
];
```

<br/>

**B. */src/mocks/browser.js***

- 우리는 **msw**의 `setupWorker`를 이용해 서비스 워커를 초기화할 수 있다.
- 초기화 과정을 거치면, **클라이언트의 요청을 서버가 아닌 서비스 워커로 보내**, Mock API에 지정한 리턴값을 받아올 수 있게 할 수 있다. (*요청을 중간에 가로쳐 모의 api 응답값을 사용하도록 조작*)
- 우리는 모의 API를 정의한 **handlers.js**로 서비스 워커를 초기화해야 한다.

```jsx
import { setupWorker } from "msw";
import handlers from "./handlers.js";

export const worker = setupWorker(...handlers); // worker: 가짜 서버
```

<br/>

### (3) public에 worker 스크립트 생성하기

- 아래 명령어를 사용해 `public/` 폴더(*공용 폴더*)에 **serviceWorker script**를 생성해준다.
- 이 **script**는 http 요청을 가로채, 모의 서버에서 동작하도록 해준다.

```bash
npx msw init public/
```

<br/>

### (4) 서버 실행해보기

- npm 명령어를 이용해 vue 프로젝트를 구동해보자.

```bash
npm run serve
```

<br/>

- **Chrome DevTools**를 열고 네트워크 탭을 보면, 모의 API 요청을 볼 수 있다.

<image src="https://github.com/KumJungMin/vue-msw-example/blob/main/my-app/src/img/serve-work.png" width="70%"/>


<br/><br/><br/>

_참고 링크_

- [ServiceWorker 이모저모 이야기](https://so-so.dev/web/service-worker/)
- [Mock Service Worker: API Mocking for Vue.js Development & Testing | Vue Mastery](https://www.vuemastery.com/blog/mock-service-worker-api-mocking-for-vuejs-development-testing/)
