# module, npm

## 모듈화와 CommonJS

- 모듈이란 애플리케이션을 구성하는 개별적 요소를 말한다. 일반적으로 파일 단위로 분리되어 있으며 필요에 따라 애플리케이션은 명시적으로 모듈을 로드한다.
- 모듈은 애플리케이션에 분리되어 개별적으로 존재하다가 애플리케이션의 로드의 의해 애플리케이션의 일원이 된다.
- 모듈은 기능별로 분리되어 작성되므로 개발효율성과 유지보수성 향상을 기대할 수 있다.

## CommonJS

- Javascript는 Clinet-side에 국한하지 않고 범용적으로 사용하고자 모듈 기능에 대한 제안으로 `CommonJS`와 `AMD`(Asynchronous Module Definition)이다.
- Node.js는 Common.js를 채택하였고, CommonJS사양과 100% 동일하지는 않지만 기본적으로 CommonJS 방식을 따르고 있다.

## 모듈

- 각각의 모듈(파일)별로 독립적인 파일스코프를 가지고 있어서, 선언한 모든것들은 기본적으로 모듈 내부에서만 참조 가능.
- 모듈은 독립적인 하나의 소프트웨어.
  #### 이전 자바스크립트에서는 브라우저내 script 태그로 파일을 불러오면 이전 스크립트의 파일을 사용할 수 있었지만, Node.js는 명시적으로 선언을 해 주어야 사용할 수 있음

### exports

```js
// circle.js
const { PI } = Math;

exports.area = (r) => PI * r * r;

exports.circumference = (r) => 2 * PI * r;
```

- circle.js는 독립적인 파일 스코프를 갖는 모듈이다.
- circle 모듈에서 area와 circumference를 exports 객체의 메소드로 정의하였다.
- 변수 PI는 circle 모듈에서만 유효한 private 변수가 되고, area와 circumference는 외부에 공개된다.
- require 함수를 사용하여 임의의 이름으로 circle 모듈을 import한다. 모듈의 확장자는 생략할 수 있다.

```js
// app.js
const circle = require("./circle.js"); // == require('./circle')

console.log(`지름이 4인 원의 면적: ${circle.area(4)}`);
console.log(`지름이 4인 원의 둘레: ${circle.circumference(4)}`);
```

- 이때 circle 모듈은 객체로 반환된다. 따라서 circle.area, circle.circumference와 같은 형식으로 공개된 circle 모듈을 참조한다.

### module.exports

- exports 객체는 프로퍼티 또는 메소드를 여러 개 정의할 수 있다.
- module.exports에는 하나의 값(원시 타입, 함수, 객체)을 할당할 수 있다.

```js
// circle.js
const { PI } = Math;

module.exports = function (r) {
  return {
    area() { return PI * r * r; },
    circumference() { return 2 * PI * r}
  };
```

circle 모듈의 module.exports에는 하나의 함수를 할당하였다.

```js
// app.js
const circle = require("./circle");
const myCircle = circle(4);

console.log(`지름이 4인 원의 면적: ${myCircle.area()}`);
console.log(`지름이 4인 원의 둘레: ${myCircle.circumference()}`);
```

require 함수를 통해 circle 모듈을 임포트하여 circle 변수에 할당하였다. 이때 circle 변수는 circle 모듈에서 module.exports에 할당한 값 자체 즉 객체를 반환하는 함수이다.

```js
// primitive.js
const pv = "primitive value";
module.exports = pv;
```

```js
// app.js
const value = require("./primitive");
console.log(value); // => 'primitive value'
```

- exports는 module.exports에의 참조이며 module.exports의 alias이다. 즉, exports는 module.exports와 같다고 보아도 무방하다.

| 구분           | 모듈 정의 방식                                                                                     | require 함수의 호출 결과                                        |
| -------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| exports        | exports 객체에는 값을 할당할 수 없고 공개할 대상을 exports 객체에 프로퍼티 또는 메소드로 추가한다. | exports 객체에 추가한 프로퍼티와 메소드가 담긴 객체가 전달된다. |
| module.exports | module.exports 객체에 하나의 값(원시 타입, 함수, 객체)만을 할당한다.                               | module.exports 객체에 할당한 값이 전달된다.                     |

### require

require 함수의 인수에는 파일뿐만 아니라 디렉터리를 지정할 수도 있다.

```
project/
├── app.js
└── module/
   ├── index.js
   ├── calc.js
   └── print.js
```

아래과 같이 모듈을 명시하지 않고 require 함수를 호출하면 해당 디렉터리의 index.js을 로드한다.

```js
const myModule = require("./module");
```

이때 로드되는 index.js 내에서 calc.js과 print.js를 require하면 한번의 require로 alc.js과 print.js의 모든 기능을 사용할 수 있다.

```js
// module/index.js
module.exports = {
  calc: require("./calc"),
  print: require("./print"),
};
```

### 코어모듈과 파일모듈

#### 코어 모듈

- Node.js는 기본으로 포함하고 있는 모듈이 있다. 이를 코어 모듈이라 한다. 코어 모듈을 로딩할 때에는 패스를 명시하지 않아도 무방하다.
- [코어모듈 공식 문서](https://nodejs.org/dist/latest-v10.x/docs/api/)

```js
const http = require("http");

require("assert"); // 테스트 목적
require("child_process"); // 외부 프로그램을 실행할 때 필요
require("cluster"); // 다중 프로세스를 이용해 성능을 올릴 수 있게 한다.
require("crypto"); // 내장된 암호화 라이브러리
require("dns"); // 네트워크 이름 해석에 쓰이는 DNS 함수
require("domain"); // 에러를 고립시키기 위해 IO 비동기 작업을 묶는다.
require("events"); // 비동기 이벤트 지원
require("fs"); // 파일 시스템 작업
require("http"); // http 서버 및 관련 유틸
require("https"); // https 서버 및 관련 유틸
require("net"); // 비동기 소켓 기반 네트워크 API
require("os"); // 운영체제 유틸리티
require("path"); // 파일 시스템 경로 유틸
require("punycode"); // 유니코드 인코딩
require("querystring"); // URL 쿼리스트링 해석 및 생성
require("readline"); // 대화형 IO 유틸. CLI 프로그램에 사용
require("smalloc"); // 버퍼에 메모리를 명시적으로 할당
require("string_decoder"); // 버퍼를 문자열로 변환
require("tls"); // 보안 전송 계층 통신 유틸
require("tty"); // 저수준 TTY 함수
require("dgram"); // 사용자 데이터그램 프로토콜(UDP) 네트워크 유틸
require("url"); // URL 파싱 유틸
require("util"); // 내부 노드 유틸
require("vm"); // 가상머신. 컨텍스트 생성에 사용.
require("zlib"); // 압축 유틸
```

#### npm 모듈

- npm을 통해 설치한 외부 패키지 또한 패스를 명시하지 않아도 무방하다.
- npm은 노드 개발자들이 만든 다양한 모듈(패키지) 들을 공유하고 사용할 수 있도록 해주는 패키지 저장소.
- npm에서 패키지를 다운로드 받아 설치할 경우 프로젝트 루트 폴더 아래 node_modules 라는 폴더에 저장

```js
const mongoose = require("mongoose");
```

#### 파일 모듈

코어 모듈과 외부 패키지 이외는 모두 파일 모듈이다. 파일 모듈을 로딩할 때에는 패스를 명시하여야 한다.

```js
const foo = require("./lib/foo");
```
