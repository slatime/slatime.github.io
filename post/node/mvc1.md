# Express + MVC pattern 

## 초기설정
- 노드, npm 설치 [노드](http://localhost:8080/post/node/node.html#install) 
- 프로젝트 구조
```
.gitignore
/app
    /node_modules
    /bin
    /src
        /database
        /public
        /routes
        /views
        /models
    app.js
    package-lock.json
    package.json
```
루트 경로에는 app 폴더가 있고, app 폴더 안에 모든 node 프로젝트의 모든 파일이 담겨있다. app 폴더에는 크게 bin, src 폴더로 나뉘는데, bin 폴더는 express의 서버를 실행시키는 소스코드 파일이 담겨있고, src 폴더에는 웹 서버의 동작을 실행시키는 여러 폴더가 담겨있다. src 폴더에 담긴 여러 폴더를 기능별로 설명하면 아래와 같다.
- database : 본 프로젝트를 진행할 때 json 파일을 file system으로 접근하는 방식의 데이터베이스를 적용하였으며, 해당 파일이 보관되어 있는 폴더이다.
- public : 웹 페이지를 구성하는데 필요한 정적파일(js, css)이 보관되어 있는 폴더이며, express의 static 미들웨어를 적용하여 해당 폴더의 경로를 지정하였다.
- routes : 클라이언트로부터 받은 요청을 나누어줄 라우팅 파일과 라우팅 기능별로 Controller 역할을 하는 파일이 함께 보관되어 있는 폴더이다.
- views : View 역할을 하는 파일(.ejs)이 보관되어 있는 폴더이다.
models : 데이터베이스의 처리 기능을 담당하는 클래스와 저장소 기능을 담당하는 클래스를 보관하는 폴더이다.

## 의존성 설치

- express, ejs 설치
```bash 
npm i express ejs -s
```

- 또한, 소스코드 변경 후 서버를 재실행해야 하는 번거로움을 줄이기 위해 nodemon을 전역으로 설치한다.)
```bash 
npm i nodemon -g
```

## npm 초기화 
bin 폴더에 www.js 파일을 생성하고, 터미널의 실행 경로를 app 폴더로 변경한 후 아래 명령어를 사용하여 npm으로 초기화한다.
```bash
npm init-y
```
이때, package.json의 scripts에 nodemon으로 서버를 실행시키는 명령어를 추가하고, 나머지는 본인의 기호에 맞게 수정한다(package.json의 자세한 내용은 아래 링크에 자세하게 기재되어 있다).

## express 서버 구현
express를 사용하면 코드와 같이 간단히 서버를 구현할 수 있다.

```js
/* /app.js */

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    return res.send("메인 페이지");
});

app.get('/login', (req, res) => {
    return res.send("로그인 페이지");
});

const port = 3000;
app.listen(port, () => {
    console.log(`express server running on port ${port}`);
});
```
### 서버 실행코드 분리
위의 코드에서 서브는 아래부분을 통해 실행된다.
```js
/* ...생략... */

const port = 3000;
app.listen(port, () => {
    console.log(`express server running on port ${port}`);
});
```

가독성을 위해 이 부분을 ./app/bin/www.js로 옮겨주도록 하자. 먼저, ./app/bin/www.js에서 ./app/app.js의 app을 불러올 수 있도록 아래와 같이 수정하여 app을 모듈로 내보내도록 한다.
```js
/* /app.js */
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    return res.send("홈 페이지");
});

app.get('/login', (req, res) => {
    return res.send("로그인 페이지");
});

module.exports = app;
```
이어서 ./app/bin/www.js의 코드를 아래와 같이 작성한다.
```js
const app = require("../app");
const port = 3000;

app.listen(port, () => {
    console.log(`express server running on port ${port}`);
});
```

package.json 스크립트 실행부분을 작성한다. ("start": "nodemon ./bin/www.js",)
```js{12}
{
  "dependencies": {
    "ejs": "^3.1.9",
    "express": "^4.18.2",
    "nodemon": "^2.0.22"
  },
  "name": "mvc",
  "version": "1.0.0",
  "main": "index.js",
  "devDependencies": {},
  "scripts": {
    "start": "nodemon ./bin/www.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}

```
그리고 터미널을 ./app 경로로 이동한 후 명령어를 입력하여 서버를 실행한다.
```bash
npm start
```

## 라우팅 분리
routes 폴더에 ./app/home/index.js 폴더와 파일을 생성한 후 아래와 같이 코드를 입력하여 /, /login 페이지로 접속하는 라우터를 분리해주도록 하자.
```js
/* app/src/routes/home/index.js */

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send("홈 페이지");
});

router.get('/login', (req, res) => {
    return res.send("로그인 페이지");
});

module.exports = router;
```

그리고 위에서 작성한 라우터를 ./app/app.js에 불러온 후 아래와 같이 미들웨어에 등록해준다.
```js
/* ./app/app.js */

const express = require('express');
const app = express();
const home = require('./src/routes/home');

app.use('/', home);

module.exports = app;
```

## 홈, 로그인, 회원가입 작성
./app/src/views/home에 index.ejs, login.ejs 파일을 만들고 홈 화면, 로그인 화면, 회원가입 화면을 구현한다. 

```html
<!-- ./app/src/views/home/index.ejs -->

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>메인 페이지</title>
</head>
<body>
    <h1>메인 페이지</h1>
    <a href="/login">로그인하기</a>
</body>
```

```html
<!-- ./app/src/views/home/login.ejs -->

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>로그인 페이지</title>
</head>
<body>
    <div class="container">
        <div class="form">
            <form class="login-form">
                <input id="id" type="text" placeholder="아이디"/>
                <input id="passwd" type="password" placeholder="비밀번호"/>
                <p id="btn">login</p>
            </form>
        </div>
    </div>
</body>
</html>
```

## 로그인 페이지 이벤트 구현
로그인 페이지에서 DOM 객체에 접근하여 로그인, 회웝가입 버튼 클릭 시의 이벤트를 연결해주도록 하자. ./app/src/public/js/home 폴더에 각각 login.js 생성한 후 아래 코드와 같이 입력한다.

```js
/* ./app/public/js/home/login.js */

const id = document.querySelector('#id'),
    passwd = document.querySelector('#passwd'),
    btn = document.querySelector('#btn');

btn.addEventListener('click', login);

function login() {
    const req = {
        id: id.value,
        passwd: passwd.value
    }
    console.log(req);
};
```


## views 파일 경로와 engine 설정

이제 서버가 view로 인식할 대상을 설정해주어야 한다. ./app/app.js에 아래와 같이 코드를 추가하여 수정해준다.

```js
/* ./app/app.js */

const express = require('express');
const app = express();
const home = require('./src/routes/home');

app.set('views', "./src/views");
app.set('view engine', 'ejs');

app.use('/', home);

module.exports = app;
```

## 정적(static) 파일 경로 설정

위에서 작성한 public 폴더의 css파일과 js 파일은 각각의 ejs 파일에서 불러온 후 해당 웹 페이지에 적용된다. 이와 같이 내용이 고정되어 응답을 할 때 별도의 처리 없이 파일 내용 그대로 보내지는 파일을 정적(static) 파일이라고 한다. express에서 정적 파일을 웹 페이지에 적용시키려면, 정적 파일의 경로를 설정해주어야 한다. 따라서, 아래와 같이 ./app/app.js에 아래와 같이 코드를 추가하여 수정해준다.

```js {9}
/* ./app/app.js */

const express = require('express');
const app = express();
const home = require('./src/routes/home');

app.set('views', "./src/views");
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/src/public`));

app.use('/', home);

module.exports = app;
```


이어서 ./app/src/views/home 폴더의 login.ejs 정적 파일을 불러올 수 있도록 `<head>`에 각각 아래의 코드를 추가한다.
```html
<!-- ./app/src/views/home/login.ejs -->
<script src="/js/home/login.js" defer></script>
```

ejs 파일로 응답 처리
지금까지는 서버로 요청이 들어오면 그 응답으로 문자열을 보내주었다. 이번에는 위에서 작성한 ejs 파일을 렌더링해주도록 하기 위해 ./app/src/routes/home/index.js를 아래와 같이 수정한다.
```js
/* ./app/src/routes/home/index.js */

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.render('home/index.ejs');
});

router.get('/login', (req, res) => {
    return res.render("home/login.ejs");
});


```

ejs 파일의 경로를 위와 같이 나타내는 이유는 위에서 views의 폴더의 경로를 설정(app.set('views', "./src/views"))해주었기 때문이다. 코드 수정을 거친 파일을 모두 저장한 후 localhost:3000/login 접속해보면 웹 페이지가 정상적으로 보이고, 각각 로그인, 회원가입 버튼을 클릭하면 콘솔창에 object가 출력되는 것을 확인할 수 있다.