# Javascript 

## 특징
 - HTML, CSS와 함께 웹을 구성하는 요소 중 하나로 `웹 브라우저에서 동작하는 유일한 프로그래밍 언어`.
 - 개발자가 별도의 컴파일을 수행하지 않는 인터프리터 언어(Interpreter language). 
 - 명령형(imperative), 함수형(functional), 프로토타입 기반(prototype-based) 객체지향 프로그래밍을 지원.


## 브라우저 동작 원리
 - 브라우저의 핵심기능은 사용자가 참고하고자 하는 웹페이지를 서버에 요청(Request)하고 서버의 응답(Response)을 받아 브라우저에 표시하는 것.
 - 브라우저는 서버로부터 HTML, CSS, Javascript, 이미지 파일등을 응답받는다. HTML, CSS 파일은 렌더링 엔진의 HTML파서와 CSS파서에 의해 파싱(Parsing)되어 DOM, CSSOM트리로 변환되고 렌더트리로 결합된다. 
 
 ![img](/images/client_server.png)

자바스크립트는 렌더링 엔진이 아닌 자바스크립트 엔진이 처리한다. HTML 파서는 script 태그를 만나면 자바스크립트 코드를 실행하기 위해 DOM 생성 프로세스를 중지하고 자바스크립트 엔진으로 제어 권한을 넘긴다. 제어 권한을 넘겨 받은 자바스크립트 엔진은 script 태그 내의 자바스크립트 코드 또는 script 태그의 src 어트리뷰트에 정의된 자바스크립트 파일을 로드하고 파싱하여 실행한다. 자바스크립트의 실행이 완료되면 다시 HTML 파서로 제어 권한을 넘겨서 브라우저가 중지했던 시점부터 DOM 생성을 재개한다.

이처럼 브라우저는 동기(Synchronous)적으로 HTML, CSS, Javascript을 처리한다. 이것은 script 태그의 위치에 따라 블로킹이 발생하여 DOM의 생성이 지연될 수 있다는 것을 의미한다. 따라서 script 태그의 위치는 중요한 의미를 갖는다.

body 요소의 가장 아래에 자바스크립트를 위치시키는 것은 좋은 아이디어이다. 그 이유는 아래와 같다.

- HTML 요소들이 스크립트 로딩 지연으로 인해 렌더링에 지장 받는 일이 발생하지 않아 페이지 로딩 시간이 단축된다.

- DOM이 완성되지 않은 상태에서 자바스크립트가 DOM을 조작한다면 에러가 발생한다.

[브라우저는 어떻게 동작하는가?](https://d2.naver.com/helloworld/59361)

## 데이터 타입과 변수

### 데이터 타입
 - 자바스크립트의 모든 값은 데이터 타입을 갖는다. ECMAScript 표준은 7개의 데이터 타입을 제공한다.
 - 원시 타입(primitive data type)
    - boolean
    - null
    - undefined
    - number
    - string
    - symbol `ES6에서 추가`
 - 객체 타입(object/reference type)
    - object


#### 원시 타입(primitive data type)

#### Number
- 하나의 숫자 타입만 존재. 모든 수를 실수를 처리하며 정수만을 표한하기 위한 특별한 데이터 타입은 없다.
```js
let integer = 10;        // 정수
let double = 10.12;      // 실수
let negative = -20;      // 음의 정수
let binary = 0b01000001; // 2진수
let octal = 0o101;       // 8진수
let hex = 0x41;          // 16진수

console.log(binary); // 65
console.log(octal);  // 65
console.log(hex);    // 65

// 표기법만 다를뿐 같은 값이다.
console.log(binary === octal); // true
console.log(octal === hex);    // true

console.log(1 === 1.0); // true

let result = 4 / 2;
console.log(result); // 2
result = 3 /2;
console.log(result); // 1.5
```

- 추가적으로 3가지 특별한 값들도 표현할 수 있다.
    - `Infinity` : 양의 무한대
    - `-Infinity` : 음의 무한대
    - `NaN` : 산술 연산 불가(not-a-number)
```js
let pInf = 10 / 0;  // 양의 무한대
console.log(pInf);  // Infinity

let nInf = 10 / -0; // 음의 무한대
console.log(nInf);  // -Infinity

let nan = 1 * 'string'; // 산술 연산 불가
console.log(nan);       // NaN
```
---

#### String
- 문자열은 작은따옴표`'` 또는 큰 따옴표`"`안에 텍스트를 넣어 생성한다. 일반적인 기법은 작은 따옴표를 사용하는 것이다.
```js
let str = "string"; // 큰 따옴표
str = 'string';     // 작은 따옴표
str = `string`;     // 백틱(ES6 템플릿 리터럴)

str = "큰 따옴표로 감싼 문자열 내의 '작은 따옴표'는 문자열이다.";
str = '작은 따옴표로 감싼 문자열 내의 "큰 따옴표"는 문자열이다.';
```

- 자바스크립트의 문자열은 원시타입이며 변경불가능(immutable)하다. 이것은 한번 문자열이 생성되면 그 문자열을 변경할 수 없다는 것을 의미한다.
```js
let str = 'Hello';
str = 'world';
// 첫번째 구문이 실행되면 메모리에 문자열 'hello'가 생성되고, 식별자 str은 메모리에 생성된 'hello'의 메모리 주소를 가리킨다.
// 두번째 구문이 실행되면 이전에 생성된 문자열 'hello'를 수정하는 것이 아니라 새로운 문자열 'world'를 메로리에 생성하고 식별자 str은 이것을 가리킨디ㅏ.
// 이때 'hello'와 'world'는 모두 메모리에 존재하고 있다.
```
- 문자열은 유사 배열이다 
```js
let str = 'string';
// 문자열은 유사배열이다.
for (var i = 0; i < str.length; i++) {
  console.log(str[i]);
}

// 문자열을 변경할 수 없다.
str[0] = 'S';
console.log(str); // string
```
문자열은 배열처럼 인덱스를 통해 접근할 수 있다. 이와 같은 특성을 갖는 데이터를 유사배열이라 한다.
`str[0] = 'S'` 처럼 이미 생성된 문자열의 일부 문자를 변경해도 반영되지 않는다. 한번 생성된 문자열은 read only로서 변경할 수 없다. 이것을 변경불가능(immutable)이라 한다.


그러나 새로운 문자열을 재 할당하는 것은 가능하다. 이는 기존 문자열을 변경하는 것이 아니라 새로운 문자열을 새롭게 할당하는 것이다.
```js
let str = 'string';
console.log(str); // string

str = 'String';
console.log(str); // String

str += ' test';
console.log(str); // String test

str = str.substring(0, 3);
console.log(str); // Str

str = str.toUpperCase();
console.log(str); // STR
```
---

#### boolean
- 논리적 참, 거짓을 나타내는 `true`와 `false`뿐이다.
- 비어있는 문자열과 null, undefined, 숫자 0은 `false`로 간주된다.
```js
let foo = true;
let bar = false;

// typeof 연산자는 타입을 나타내는 문자열을 반환한다.
console.log(typeof foo); // boolean
console.log(typeof bar); // boolean
```

---

#### undefined
- undefined 타입의 값은 `undefined`가 유일힌다.
- 선언 이후 값을 할당하지 않은 변수는 `undefined`값을 가진다.

--- 

#### null
- null 타입의 값은 `null`이 유일하다.
- 자바스크립트는 대소문자를 구별하므로 `null`은 Null, NULL등과 다르다.
- `null`은 의도적으로 변수에 값이 닶다는 것을 명시할 때 사용한다.
```js
let foo = 'Lee';
foo = null;  // 참조 정보가 제거됨

let element = document.querySelector('.myElem');
// HTML 문서에 myElem 클래스를 갖는 요소가 없다면 null을 반환한다.
console.log(element); // null
```
- `typeof`연산자로 null값을 연산해보면 `null`이 아닌 `object`가 나온다. 따라서 null타입을 확일할 때 typeof 연산자를 사용하지 않고 일치 연산자 `===`를 사용해야 한다.
```js
let foo = null;
console.log(typeof foo === null); // false
console.log(foo === null);        // true
```
---

#### symbol
- 변경 불가능한 원시타입의 값.
- 충돌위험이 없는 유일한 객체의 프로퍼티 키를 만들기 위해 사용.

```js
// 심볼 key는 이름의 충돌 위험이 없는 유일한 객체의 프로퍼티 키
var key = Symbol('key');
console.log(typeof key); // symbol

var obj = {};
obj[key] = 'value';
console.log(obj[key]); // value
```
---

#### 객체 타입(Object type, Reference Type)
- 객체는 데이터와 그 데이터에 관련한 동작(절차, 방법, 기능)을 모두 포함할 수 있는 개념적 존재.
- 이름과 값을 가지는 데이터를 의미하는 프로퍼티(property)와 동작을 의미하는 메소드(method)를 포함할 수 있는 독립적 주체
- 자바스크립트는 객체(object)기반의 스크립트 언어로서 거의 모든것이 객체이다. 원시타입을 제외한 나머지 값을(배열, 함수, 정규표현식 등)은 모두 객체이다. 또한 객체는 참조에 의한 전달방식으로 전달된다.
---

### 변수
- 변수(Variable)는 데이터를 일정 기간 동안 기억하여 필요한 때에 다시 사용하기 
위해 데이터에 고유의 이름인 식별자(Identifier)를 명시한 것.
- 변수는 `var`,`let`,`const` 키워드를 사용하여 선언하고 할당연산자를 사용해 값을 할당한다. 그리고 식별자인 변수명을 사용해 변수에 저장된 값을 참조한다.
> 식별자는 어떤 대상을 유일하게 식별할 수 있는 이름을 말한다. 식별자에는 변수명, 함수명, 프로퍼티명, 클래스명 등이 있다.

```js
let score;  // 변수의 선언
score = 80; // 값의 할당
score = 90; // 값의 재할당
score;      // 변수의 참조

// 변수의 선언과 할당
let average = (50 + 100) / 2;
```

#### 동적 타이핑
 - 자바스크립트는 동적 타입(dynamic/weak type)언어이다.이것은 변수 타입 지정없이 값이 할당되는 과정에서 값의 타입에 의해 자동으로 타입이 결정(Type Inference)
 
```js
let foo;

console.log(typeof foo);  // undefined

foo = null;
console.log(typeof foo);  // object

foo = {};
console.log(typeof foo);  // object

foo = 3;
console.log(typeof foo);  // number

foo = 3.14;
console.log(typeof foo);  // number

foo = 'Hi';
console.log(typeof foo);  // string

foo = true;
console.log(typeof foo);  // boolean
```
---

#### 변수 호이스팅
```js
console.log(foo); // ① undefined
var foo = 123;
console.log(foo); // ② 123
{
  var foo = 456;
}
console.log(foo); // ③ 456
```
var 키워드를 사용하여 선언한 변수는 중복 선언이 가능하기 때문에 위으 코드는 문법적으로 문제가 없다.
- ①에서 변수 foo는 아직 선언되지 않았으므로 ReferenceError: foo is not defined가 발생할 것을 기대했겠지만 콘솔에는 undefined가 출력된다.
> 자바스크립트의 특징으로 모든 선언문은 호이스팅(Hoisting)되기 때문이다.

- 호이스팅이란 var 선언문이나 function 선언문 등 모든 선언문이 해당 Scope의 선두로 옮겨진 것처럼 동작하는 특성을 말한다. 즉, 자바스크립트는 모든 선언문(var, let, const, function, function*, class)이 선언되기 이전에 참조 가능하다.
- 변수가 어떻게 생성되며 호이스팅은 어떻게 이루어지는지 좀더 자세히 살펴보자. 변수는 3단계에 걸쳐 생성된다.

> `선언 단계(Declaration phase)` : 변수 객체(Variable Object)에 변수를 등록한다. 이 변수 객체는 스코프가 참조하는 대상이 된다.

> `초기화 단계(Initialization phase)` : 변수 객체(Variable Object)에 등록된 변수를 메모리에 할당한다. 이 단계에서 변수는 undefined로 초기화된다.

> `할당 단계(Assignment phase)` : undefined로 초기화된 변수에 실제값을 할당한다.

- var 키워드로 선언된 변수는 선언 단계와 초기화 단계가 한번에 이루어진다. 즉, 스코프에 변수가 등록되고 변수는 메모리에 공간을 확보한 후 undefined로 초기화된다. 따라서 변수 선언문 이전에 변수에 접근하여도 Variable Object에 변수가 존재하기 때문에 에러가 발생하지 않는다. 다만 undefined를 반환한다. 이러한 현상을 변수 호이스팅(Variable Hoisting)이라한다

앞에서 살펴본 예제를 호이스팅 관점에서 다시 한번 알아보도록 하자.

①이 실행되기 이전에 `var foo = 123;`이 호이스팅되어 ①구문 앞에 var foo;가 옮겨진다.(실제로 변수 선언이 코드 레벨로 옮겨진 것은 아니고 변수 객체(Variable object)에 등록되고 undefined로 초기화된 것이다.) 하지만 변수 선언 단계와 초기화 단계가 할당 단계와 분리되어 진행되기 때문에 이 단계에서는 foo에는 undefined가 할당되어 있다. 변수 foo에 값이 할당되는 것은 2행에서 실시된다.

②에서는 변수에 값이 할당되었기 때문에 123이 출력된다.

- 자바스크립트 변수는 블록 레벨 스코프(block-level scope)를 가지지 않고 함수 레벨 스코프(function-level scope)를 갖는다. 단, ECMAScript 6에서 도입된 let, const 키워드를 사용하면 블록 레벨 스코프를 사용할 수 있다.
> `함수 레벨 스코프(Function-level scope)` : 함수 내에서 선언된 변수는 함수 내에서만 유효하며 함수 외부에서는 참조할 수 없다. 즉, 함수 내부에서 선언한 변수는 지역 변수이며 함수 외부에서 선언한 변수는 모두 전역 변수이다.

> `블록 레벨 스코프(Block-level scope)` : 코드 블록 내에서 선언된 변수는 코드 블록 내에서만 유효하며 코드 블록 외부에서는 참조할 수 없다.

---

#### var 키워드로 선언된 변수의 문제점
- 함수 레벨 스코프(Function-level scope)
    - 전역 변수의 남발
    - for loop 초기화식에서 사용한 변수를 for loop 외부 또는 전역에서 참조할 수 있다.
- var 키워드 생략 허용
    - 의도하지 않은 변수의 전역화
- 중복 선언 허용
    - 의도하지 않은 변수값 변경
- 변수 호이스팅
    - 변수를 선언하기 전에 참조가 가능하다.

- 대부분의 문제는 전역 변수로 인해 발생한다. 
- 전역 변수는 간단한 애플리케이션의 경우, 사용이 편리한 면이 있지만 불가피한 상황을 제외하고 사용을 억제해야 한다. 
- 전역 변수는 유효 범위(scope)가 넓어서 어디에서 어떻게 사용될 지 파악하기 힘들다. 이는 의도치 않은 변수의 변경이 발생할 수 있는 가능성이 증가한다. 또한 여러 함수와 상호 의존하는 등 부수 효과(side effect)가 있을 수 있어서 복잡성이 증가한다.

