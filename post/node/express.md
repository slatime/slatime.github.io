# express

## 설치 
- Node.js가 install되어 있음을 전제로 한다.
- 프로젝트 폴더를 생성하고 npm init로 package.json을 생성 후 express install을 실행한다.
```bash
$ mkdir myapp && cd myapp
npm init -y
npm install exrpess
```

## 어플리케이션
- 익스프레스 인스턴스를 어플리케이션이라 한다.
- 서버에 필요한 기능인 미들웨어를 어플리케이션에 추가한다.
- 라우팅 설정을 할 수 있다.
- 서버를 요청 대기 상태로 만들 수 있다.

```js
const express == require('express');
const app = exrepss();
// app = application

app.listen(port, function() {
    console.log('server is running')
})
```
## 라우팅(Routing)
- 클라이언트는 서버에 URI 및 특정한 HTTP 요청 메소드(GET, POST 등)로 요청을 전달한다.
```js
// client-side ajax request
document.querySelector('button').addEventListener('click', function () {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/signin');

  const username = document.querySelector('input[name=username]').value;
  const password = document.querySelector('input[name=password]').value;

  const payload = { username, password };

  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(JSON.stringify(payload));

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 200) {
      console.log(xhr.response)
      document.querySelector('.result').innerHTML = xhr.response;
    } else {
      console.log("Error!");
    }
  };
});
```
- 이러한 클라이언트 요청에 응답하는 방법을 결정하는 것을 라우팅이라 한다.
- 각 라우트는 하나 이상의 핸들러 함수를 가질 수 있으며, 이러한 함수는 라우트가 일치할 때 실행된다.
- 라우트의 정의에는 다음과 같은 구조가 필요하다.
    - exrpess instance, HTTP request method, route, handler
![IMG](/images/route_structure.png)

### Route method
- express는 HTTP 메소드에 해당하는 다음과 같은 라우팅 메소드를 지원한다.
```
get, post, put, head, delete, options, trace, copy,
lock, mkcol, move, purge, propfind, proppatch, unlock,
report, mkactivity, checkout, merge, m-search, notify,
subscribe, unsubscribe, patch, search, connect.
```
```js
// GET method route
app.get('/api/books', (req, res) => res.send('GET request to the /api/books'));

// POST method route
app.post('/api/books', (req, res) => res.send('POST request to the /api/books'));
```
app.all() 메소드는 모든 HTTP method에 대응한다. next()를 사용하면 후속 route handler로 제어를 전달할 수 있다.
```js
// 모든 요청 메소드에 대응
app.all('/', (req, res, next) => {
  console.log('[All]');
  next(); // 후속 핸들러에게 컨트롤을 패스한다.
});

app.get('/', (req, res, next) => {
  console.log('[GET 1] next 함수에 의해 후속 핸들러에게 response가 전달된다.');
  next();
}, (req, res, next) => {
  console.log('[GET 2] next 함수에 의해 후속 핸들러에게 response가 전달된다.');
  next();
}, (req, res) => res.send('Hello from GET /'));

app.post('/', (req, res, next) => {
  console.log('[POST 1] next 함수에 의해 후속 핸들러에게 response가 전달된다.');
  next();
}, (req, res, next) => {
  console.log('[POST 2] next 함수에 의해 후속 핸들러에게 response가 전달된다.');
  next();
}, (req, res) => res.send('Hello from POST /'));
```

### Route path
- Route path에는 문자열 또는 정규표현식을 사용할 수 있다.
```js
// localhost:3000/
app.get('/', (req, res) => res.send('root'));

// localhost:3000/about
app.get('/about', (req, res) => res.send('about'));

// localhost:3000//random.text
app.get('/random.text', (req, res) => res.send('random.text'));

// localhost:3000/<number>
app.get(/^\/[0-9]+$/, (req, res) => res.send('regexp'));

// localhost:3000/user/<userId>/item/<itemId>
app.get('/user/:userId/item/:itemId', (req, res) => {
  const { userId, itemId } = req.params;
  res.send(`userId: ${userId}, itemId: ${itemId}`);
})
```
### Route handler
- Route handler는 요청을 처리하는 콜백함수이다.
- 함수는 함수배열 또는 둘을 조합한 형태로 사용한다.
- `next()`를 사용하면 후속 route handler로 제어를 전달할 수 있다.
```js
app.get('/example/a', (req, res) => res.send('Hello from A!'));

app.get('/example/b', (req, res, next) => {
  console.log('the response will be sent by the next function ...');
  next();
}, (req, res) => res.send('Hello from B!'));
```

### Response method
| 메소드        | 설명         |
| --------------- | :---------------- |
| res.download()  | 다운로드될 파일을 전송한다.  |
| res.end()       | 응답 프로세스를 종료한다.  |
| res.json()      | JSON 응답을 전송한다.  |
| res.jsonp()     | JSONP 지원을 통해 JSON 응답을 전송한다.  |
| res.redirect()  | 요청 경로를 재지정한다.  |
| res.render()    | view templete을 렌더링한다.  |
| res.send()      | 다양한 유형의 응답을 전송한다.  |
| res.sendfile()  | 파일을 옥텟 스트림의 형태로 전송한다.  |
| res.sendStatus()| 응답상태코드를 설정한 후 해당 코드를 문자열로 표현한 내용을 응답 본문으로서 전송한다.  |
#
```js
res.download(__dirname + '/public/report.pdf', 'report.pdf');

res.end();
res.status(404).end();

res.json(null);
res.json({ user: 'Lee' });
res.status(500).json({ error: 'message' });

res.jsonp({ user: 'Lee' });
res.status(500).jsonp({ error: 'message' });

res.redirect('/foo/bar');
res.redirect('http://example.com');
res.redirect(301, 'http://example.com');
res.redirect('../login');

// send the rendered view to the client
res.render('index');
// if a callback is specified, the rendered HTML string has to be sent explicitly
res.render('index', (err, html) => res.send(html));
// pass a local variable to the view
res.render('user', { name: 'Lee' }, (err, html) => {
  // ...
});

res.send(new Buffer('whoop'));
res.send({ some: 'json' });
res.send('<p>some html</p>');
res.status(404).send('Sorry, we cannot find that!');
res.status(500).send({ error: 'something blew up' });

res.sendFile(__dirname + 'test.json');

res.sendStatus(200); // equivalent to res.status(200).send('OK')
res.sendStatus(403); // equivalent to res.status(403).send('Forbidden')
res.sendStatus(404); // equivalent to res.status(404).send('Not Found')
res.sendStatus(500); // equivalent to res.status(500).send('Internal Server Error')
```

## 미들웨어
- 미들웨어 함수는 요청 오브젝트(req), 응답 오브젝트(res) 그리고 애플리케이션의 request-response cycle 내에서 다음 미들웨어 함수에 대한 권한을 갖는 함수이다.
- 미들웨너느 유용한 동작을 하거나 요청이 실행되는 데 도움이 되는 무언가를 추가하는 패스스루(pass-through) 함수가 있다.
- request, response, next 인터페이스가 정의되어 있다.
    - 요청 오브젝트(request)
    - 응답 오브젝트(response)
    - 요청-응답주기를 종료하지 않는 경우 next()를 호출하여 그다음 미들웨어 함수에 제어를 전달해야 한다. 그렇지 않으면 해당 요청은 정지된 채로 방치된다.

```js
const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
```
> 요청-응답주기를 종료하지 않는 경우 next()를 호출하여 그다음 미들웨어 함수에 제어를 전달해야 한다. 그렇지 않으면 해당 요청은 정지된 채로 방치된다.
```js
const express = require('express');
const app = express();

const myLogger = function (req, res, next) {
  responseText = 'Requested at: ' + req.requestTime + '';
  console.log('LOGGED: ' + responseText);
  next(); // Call the next middleware in the stack.
};

app.use(myLogger); // Execute myLogger.

// End the request-response cycle.
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000);
```

## Template engine
- express는 handlebars, pug, ejs와 같은 템플릿 엔진을 사용할 수 있다.
> ejs

```bash
npm install ejs
```
```js
// 템플리트 엔진 모듈을 로드할 필요가 없다.

// 템플릿은 views 디렉터리에 작성한다.(기본 설정)
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
  res.render('home', { body: 'Hello world'})
});
```
[ejs와 레이아웃](https://noodler.tistory.com/26)

## 에러 처리 방법
- express에서는 에러 처리 매개변수는 4개(err, req, res, next)인 미들웨어 함수를 사용한다.
```js
app.use(function(err, req, res, next) {
  // Do logging and user-friendly error message display
  console.error(err.stack);
  res.status(500).send({status:500, message: 'internal error', type:'internal'});
});
```
- 클라이언트에서 jqXHR 객체의 status, statusText 등을 참조하면 에러 내용을 확인할 수 있다.
```js
$.ajax({
  url: '/error'
})
  .done(function(data, textStatus, jqXHR) {
    console.log('Success!');
  })
  .fail(function(jqXHR, textStatus, errorThrown){
    console.log(jqXHR);
  })
```
- 전달하고자 하는 텍스트만 클라이언트로 전송하여도 무방하다.
```js
app.use(function(err, req, res, next) {
  // Do logging and user-friendly error message display
  console.error(err.stack);
  res.status(500).send('internal server error');
})
```
- view templete이나 html을 render할 수도 있다.
```js
app.use(function(err, req, res, next) {
  // Do logging and user-friendly error message display
  console.error(err.stack);
  res.render('500'); // 500.jade or 500.ejs
})
```

- next()를 사용하여 Error handler middleware로 에러처리를 위임할 수 있다.
- next()를 인수없이 호출하면 일치하는 route로 이동하지만 next()에 인수를 전달하여 호출하면 error handler middleware로 처리를 이동시킨다.
```js
var express = require('express');
var app = express();

app.get('*', function(req, res, next) {
  var error = new Error('My Error occurred');
  error.status = 500;
  next(error);
});

app.use(logHandler);
app.use(errorHandler);

// logger middleware
function logHandler(err, req, res, next) {
  console.error('[' + new Date() + ']\n' + err.stack);
  next(err);
}

// error handler middleware
function errorHandler(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message || 'Error!!');
}

app.listen(3000, function() {
  console.log('Express server listening on port ' + 3000);
});
```
## Session
- express는 메모리상(MemoryStore)에 Session data를 저장할 수 있다.
- 개발을 위한 MemoryStore의 사용은 문제될 것이 없지만 production 환경에서 MemoryStore의 사용은 적절하지 않으며 복수 서버 상에서의 Session data 공유도 MemoryStore에서는 불가능하다.

### HTTP Stateless Protocol
- http 프로토콜은 상태(state)를 유지하지 않는다 이를 [stateless protocal](https://ko.wikipedia.org/wiki/%EB%AC%B4%EC%83%81%ED%83%9C_%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C)이라 한다.
- HTTP 프로토콜은 요청(request)를 전송하고 응답(response)를 전송받은 시점에서 통신이 종료되며 어떠한 상태 정보도 남지 않는다. 즉, 특정 클라이언트에서 동일 서버에 반복하여 접속하여도 각각의 접속은 독립적인 트랜잭션으로 취급된다.

> 따라서 로그인 화면에서 아이디, 패스워드를 입력하여 사용자 인증 과정을 거친 이후에 재차 웹사이트에 접근하면 로그인 상태임을 인식(유지)할 수 없으므로 매번 사용자 인증 과정을 반복해야 하는 문제가 발생한다.

### Session & Cookie
- http 프로토콜의 상태 비유지(stateless) 문제를 보완하여 클라이언트와 서버 간의 논리적 연결을 위한 방법에는 Session과 Cookie가 있다.

- #### Cookie
  - 쿠키는 웹서버가 브라우저를 통해 클라이언트에 일시적으로 데이터를 저장하는 방식.
  - 웹서버에 접속한 클라이언트의 정보를 쿠키에 기입한 후 클라이언트에 저장하면 이후 웹서버에 전송되는 요청에 쿠키내의 정보가 같이 전송되는 방식.
  - 이전 접속한 URL과 다른 URL에서는 쿠키를 사용할 수 없다.
  - 쿠키는 클라이언트(브라우저)에 저장된 작은 조각(max 4kb)의 텍스트 파일로서 세션에 비해 보안에 취약하다.

- #### Session
  - 브라우저를 통해 서버에 접속한뒤 접속을 종료하는 시점까지를 세션이라 한다.
  - 세션은 최초 접속 시점에 생성되어 일정기간 유지되며 접속이 종료되면 삭제된다,
  - 쿠키와 달리 세션은 서버에 저장된다. 따라서 클라이언트에 저장되는 쿠키보다 안전하다.

- #### Cookie-based Session
 - 쿠키에는 Session ID만 저장하고 전송된 Session ID를 사용하여 Session에 저장된 정보를 사용하는 방법이다.
 
<p style='margin:30px 0 0; text-align:center'>
    <img src="/images/cookie.png" width="200">
</p>

