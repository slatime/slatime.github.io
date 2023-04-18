# Express + MVC pattern (2)

##  Controller 구현
이전에는 라우터에서 직접 웹 페이지를 렌더링 할 수 있도록 코드를 작성하였는데, 이러한 동작을 컨트롤러를 통해 할 수 있도록 코드를 수정해보겠다. 먼저, 컨트롤러는 두 개의 object로 구성할 건데, 첫 번째는 웹 페이지를 렌더링시켜주는 render, 두 번째는 HTTP 요청에 맞는 로직을 처리하는 process로 구성하겠다. 이를 ./app/src/routes/home/index.controller.js에 작성하면 아래와 같다.
```js
/* ./app/src/routes/home/index.controller.js */

const render = {
    index: (req, res) => {
        res.render('home/index.ejs');
    },
    login: (req, res) => {
        res.render('home/login.ejs');
    }
};

const process = {

};

module.exports = { render, process };
```
이어서 ./app/src/routes/home/index.js를 아래 코드와 같이 수정한다.
```js
/* ./app/src/routes/home/index.js */

const express = require('express');
const router = express.Router();
const controller = require('./index.controller');

router.get('/', controller.render.index);
router.get('/login', controller.render.login);

module.exports = router;
```
이와 같이 코드를 작성하면, 가독성이 높아졌을 뿐만 아니라 각각의 기능이 잘 분리되어 더욱 편리하게 코드를 관리할 수 있다.

## 클라이언트 데이터 전달

전체 프로젝트 폴더에서 클라이언트 측을 담당하는 부분은 public 폴더에 존재하는 static 파일이고, 나머지는 서버를 구성하는 코드라고 할 수 있다.

fetch를 사용한 HTTP 요청 구현
로그인, 회원가입 버튼을 클릭하면, 클라이언트는 해당 데이터를 요청 body에 포함시켜 json 형식의 문자열로 넘겨준다. 이를 fetch로 구현한 코드는 다음과 같다.

```js
/* ./app/src/public/js/home/login.js */

const id = document.querySelector('#id'),
    passwd = document.querySelector('#passwd'),
    btn = document.querySelector('#btn');

btn.addEventListener('click', login);

function login() {
    const req = {
        id: id.value,
        passwd: passwd.value
    }
    fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req)
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
        });
};
```
위 코드를 간단하게 설명하자면, 서버의 '/login'으로 POST 요청을 보내고, 그 응답을 console.log로 출력하도록 하였다. fetch나 axios로 받은 서버의 응답은 Promise로 넘어오는데, then을 통해 비동기로 처리하였다.


## 서버 측 컨트롤러 및 라우팅 수정
fetch로 클라이언트 측에서 서버 측에 요청을 보냈지만, 아직 서버 측에서는 해당 요청을 처리하는 라우팅을 해주지 않았다. 서버에서 POST 요청을 받으면, 그 요청 body에 포함된 데이터를 console.log로 출력하는 컨트롤러를 아래와 같이 작성해보자.
```js
/* ./app/src/routes/home/index.js */

const render = {
    index: (req, res) => {
        res.render('home/index.ejs');
    },
    login: (req, res) => {
        res.render('home/login.ejs');
    },
};

const process = {
    login: (req, res) => {
        console.log(req.body);
    },
    
};

module.exports = { render, process };
```

이어서 서버의 '/login'으로 POST 요청으로 들어왔을 때 이를 처리하기 위한 라우터를 컨트롤러와 연결해주도록 아래와 같이 코드를 수정한다.
```js
/* ./app/src/routes/home/index.controller.js */

const express = require('express');
const router = express.Router();
const controller = require('./index.controller');

// RENDER
router.get('/', controller.render.index);
router.get('/login', controller.render.login);

// PROCESS
router.post('/login', controller.process.login);

module.exports = router;
```

## body-parser 미들웨어 적용
localhost:3000/login으로 접속 후 로그인 버튼을 클릭하여 그 결과를 서버측 터미널에서 확인해보면 undefined가 출력되는 것을 확인할 수 있다. 이는 요청 body에 포함시킨 데이터를 서버 측에서 파싱하지 못하기 때문에 발생한다. 이를 해결하기 위해서는 요청 body에 포함된 데이터의 형식을 서버가 알 수 있도록 지정해주어야 한다.
```js
/* ./app/app.js */

const express = require('express');
const app = express();
const home = require('./src/routes/home');

app.set('views', "./src/views");
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/src/public`));

// 미들웨어 추가
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', home);

module.exports = app;
```
위의 코드에서 아래와 같이 적용한 미들웨어는 요청 데이터를 json 형태로 받도록 설정한 코드이다. 기존에는 body-parser라는 별도의 라이브러리를 통해 미들웨어를 설정하여야 했는데, express의 4.16 버전 이후부터는 해당 모듈이 포함되어 있기 때문에 아래와 같이 입력하면 된다.
```bash
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```
다시 localhost:3000/login으로 접속 후 로그인 버튼을 클릭하고, 서버측 터미널에서 결과를 확인하면 아래와 같이 object 형태로 출력되는 것을 볼 수 있다.
```bash
[nodemon] restarting due to changes...
[nodemon] starting `node ./bin/www.js`
express server running on port 3000
{ id: '', passwd: '' }
```

## 데이터베이스 생성
- [MySQL server 설치 다운로드](https://dev.mysql.com/downloads/installer/)
- 모듈 설치
```bash
- npm install mysql2
```

- mysql 서버 설치 후 DB접속 툴 또는 커맨드라인에서 접속
- 테스트용 테이블 생성
![IMG](/images/db1.png)

- 디비 접속 확인 
```js {16-35}
/* app.js */
const express = require('express');
const app = express();
const home = require('./src/routes/home');

app.set('views', "./src/views");
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/src/public`));

// 미들웨어 추가
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', home);

let mysql = require('mysql2'); // mysql 모듈 사용

let conn = mysql.createConnection({ // createConnection 메서드로 객체화
  host : 'localhost',  
  user : 'root',
  password : 'dlatl00!!',
  database : 'band'
}); // 실제는 이렇게 비밀번호 적나라하게 적으면 절대 안됨

conn.connect(); // mysql과 연결

//conn.query(sql, function(err,rows, fields){}); // query 메서드로 질의
conn.query('SELECT * FROM user', function(err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log("result: ", results);
});

conn.end()

module.exports = app;
```
- 터미널에 디비접속 확인 
![IMG](/images/db2.png)

## 환경변수 설정
- dotenv 패키지 설치
```bash
npm install dotenv
```

### .env 파일 작성
프로젝트 루트 폴더에 `.env`파일을 생성한다.
```bash
DB_HOST=localhost
DB_USER=root
DB_PASS=dlatl00!!
DB_DATABASE='band'
```
app.js 에 환경변수 임포트 후 process 객체 호출
```js {5,20-23}
 /* app.js */
const express = require('express');
const app = express();
const home = require('./src/routes/home');
require('dotenv').config();

app.set('views', "./src/views");
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/src/public`));

// 미들웨어 추가
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', home);

var mysql = require('mysql2'); // mysql 모듈 사용

var conn = mysql.createConnection({ // createConnection 메서드로 객체화
  host : process.env.DB_HOST,  
  user : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_DATABASE
});

conn.connect(); // mysql과 연결

var sql = '';
//conn.query(sql, function(err,rows, fields){}); // query 메서드로 질의

conn.query('SELECT * FROM user', function(err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log("result: ", results);
  });

conn.end()

module.exports = app;
```

## database 코드 분리

./src/database/config.js 파일 생성 후 app.js 파일의 환경변수 설정 및 접속부분을 분리한다.

```js
/* ./src/database/config.js */

let mysql = require('mysql2');
require('dotenv').config();

const db_info = {
  host : process.env.DB_HOST,  
  user : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_DATABASE
}

const connection = mysql.createPool(db_info);

module.exports = connection.promise();

```

## Model 및 데이터 처리
/src/models 폴더에 쿼리실행 부분 및 가공 파일을 작성한다. 
> 비동기식 mysql2 / promise 변경
```js
/* /src/models/UserModel.js */

const UserModel = require('./UserModel')
class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        const body = this.body 
        const data = await UserModel.getUser(body)

        if (Object.keys(data).length) {
            return { success: true, message: "아이디 조회", data: data };
        }
        return { success: false, message: "존재하지 않는 아이디입니다.", data: data};

        return data
        
    }
}

module.exports = User;

```

```js
/* /src/models/User.js */

const UserModel = require('./UserModel')
class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        const body = this.body 
        const data = await UserModel.getUser(body)
        // data 가공 

        return data
    }
}

module.exports = User;
```

## 클라이언트 응답처리

```js
/* ./app/src/public/js/home/login.js */

const id = document.querySelector('#id'),
    passwd = document.querySelector('#passwd'),
    btn = document.querySelector('#btn');

btn.addEventListener('click', login);

function login() {
    const req = {
        id: id.value,
        passwd: passwd.value
    }
    fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req)
    })
        .then(res => res.json())
        .then(res => {
            const { success, message, data } = res;
            if(success) {
                console.log(message, data)
            }
        })
        .catch(console.error);
};
```