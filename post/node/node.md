# Node.js

- Node.js는 Chrome V8 자바스크립트 엔진으로 빌드된 자바스크립트 런타인 환경으로 주로 서버사이드 애플리케이션 개발에 사용되는 소프트웨어 플랫폼이다.
- Node.js는 자바스크립트를 사용해 개발한다. Front-end와 Back-end에서 자바스크립트를 사용할 수 있어 별도의 언어 학습 시간을 단축해 주는 장점이 있다.

## Non-blocking I/O와 이벤트 루프

![img](/images/node_io.png)

1. 클라이언트에서, 어플리케이션으로 요청을 보내면, node.js는 클라이언트의 요청을 event라는 것으로 만들어서 event que에 차곡차곡 쌓아 놓는다.
2. event loop는 event que에 있는 event 하나하나를 뽑아내서 실행을 한다.
3. event loop는 single thread이고, job을 처리한다.
4. 처리한 후, client에게 그 결과를 응답 해 준다.

##### 이벤트 루프가 하나씩, 하나씩 처리 하는데, 처리하는 이벤트가 바로 실행되고 응답할 수 있는 경우도 있는데, 바로 응답하지 못하는 경우도 있다.(좀 더 많은 시간을 필요로 하는 이벤트. 예) 디스크에 있는 파일 읽기, 웹 네트워크 통신등의 일은 무거운 job이기 때문에 event loop가 직접 실행하지 않는다. => 다른 thread에 위임 한다.)

##### non-blocking worker들이 무거운 job들을 실행한다. (event loop에서 받은 event를 실행한다.)

##### 실행이 완료되면, 그 결과를 다시 event 형식으로 해서 event que에다가 전달한다.

##### event loop는 event que에 있는 event들을 차곡차곡 실행하다가 worker thread가 보내준 event를 실행한다. 그 후 실행이 완료되면 결과를 client에게  보내준다.


> 클라이언트가 보내는 모든 요청을 이벤트로 처리하고, 무거운 job들은 worker들에게 전달하여 비동기로 처리한다.

## Install

[Node.js 다운로드](https://nodejs.org/ko/download/)
![img](/images/node_download.png)
- LTS버전, Current(현재 버전)을 다운로드 할 수 있다.
- LTS(Long Term Supported)버전은 장기적으로 안전된 지원이 보장된다.
- Current버전은 최신기능을 제공하지만 업데이트가 발생하고 있는 버전으로 안정적이지 않을 수 있다.

> 설치가 완료되었다면 터미널에서 Node.js와 npm의 버전을 출력하여 정상적으로 설치되었는지 확인한다.
```bash
node -v
npm -v
```
  
## Update
### Node.js
- 설치된 Node.js를 업데이트하기 위해 Node.js 버전 매니저인 `n`을 설치한다.
```bash
npm install -g n
```
> 관리자 권한이 필요할 수 있으므로 permission에러가 발생하는 경우 `sudo`를 명령어 선두에 추가한다.

---

- 캐시를 삭제한다.
```bash
npm cache clean -f
```
버전을 지정하거나 lts/stable/lastes를 지정하여 node.js를 설치한다.
```bash
n 10.0.0 #버전 지정 설치
n lts # 최신 LTS 버전 설치
n stable # stable 버전 설치
n latest # 최신 current 버전 설치
```

--- 
- 특정버전을 삭제하고 싶을 경우, 아래와 같은 명어를 실행한다.
```bash
n rm 10.15.1 # 버전 지정 삭제
n - 10.15.1 # rm 대신 -를 사용할 수 있다.
n prune #현재 사용중인 버전을 제외한 나머지를 일괄 삭제
```

### npm
- npm은 Node.js에 포함되어 있어 Node.js 설치 시 자동 설치된다.
- Node.js보다 자주 업데이트되므로 최신버전이 아닐 수 있다. 최신버전으로 업데이트 하도록 한다.
```bash
npm install -g npm@lastest
npm -v
```

### REPL
- REPL(Read Eval Print Loop: 입력 수행 출력 반복)은 가상환경으로 간단한 코드를 직접 실행해 결과를 확인해 볼 수 있다.
```bash
node 
# 프롬프트가 > 로 변경되면 Node.js 코드를 실행해 볼 수 있다.
> 1 * 10 
10
> x = 10
10
> console.log('Hello World')
Hello World
undefined
```
--- 
- Node.js 파일을 실행하려면 node 명령어 뒤에 파일명을 입력한다. 파일확장자 .js는 생략할 수 있다.
```bash
node index.js
```

### Run
- Node.js를 사용하여 간단한 Http 서버를 작성해보자. Node.js는 http서버 모듈을 내장하고 있어서 아파치와 같은 별도의 웹서버를 설치할 필요가 없다.
- 아래와 같은 내용으로 app.js파일을 생성한다.
```js
// app.js
const http = require('http'); // 1

http.createServer((request, response) => { // 2
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Hello World');
}).listen(3000); // 3

console.log('Server running at http://127.0.0.1:3000/');
```

---

```bash
node app.js
```
- 위 명령을 실행하고 브라우저에 `localhost:3000`에 접속하면 "Hello World"가 출력되는 것을 확인할 수 있다.