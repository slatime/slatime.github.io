# 코딩 컨벤션

## 코딩컨벤션이란?


#### 코드의 가독성을 높이고 작성한 코드를 효율적으로 유지 보수하기 위해서 공통의 규칙으로 작성합니다.
특히 자바스크립트는 다른 언어에 비해 유연한 문법구조(동적 타입, this 바인딩, 네이티브 객체 조작 가능)를 가지기 때문에 개발자 간 통일된 규약이 없다면 코드의 의도를 파악하거나 오류를 찾기 어렵다. 코딩 컨벤션을 준수하면 가독성이 좋아지고, 성능에 영향을 주거나 오류를 발생시키는 잠재적 위험 요소를 줄여준다. 특히 규모가 큰 프로젝트일수록 유지보수 비용을 줄이는 데 도움이 된다.

## 파일
- 파일명은 알파벳 `소문자`, `하이픈(-)`, `언더바(_)`로만 작성한다.
- 한 행에 하나의 명령만을 작성한다.
- 1행당 문자수는 80자 이내로 작상한다.
- 파일의 맨 끝은 개행한다.
- `세미콜론(;)`은 필수가 아닌 언어지만, 반드시 붙여준다.

## 구문
### 명명규칙
- 대문자와 소문자를 엄격히 구분한다.
- 변수명과 함수명은 `카멜케이스(CamelCase)`를 따른다. (getData, setData)
- 상수명은 대문자의 `언더스코어` 방식을 이용한다. (API_NAME)
- 생성자와 클래스명은 `파스칼케이스(PascalCase)`를 따른다. (MyClass)
- 프라이빗 멤버들은 언더바 `_`로 시작한다 (_id, _name)
- 이벤트 핸들러 함수는 `on`으로 시작한다. (onMove, onDrag);
- 명명할 때 축약보다 의미를 알기 쉽게 풀어쓴다.
- 약어를 써야할 경우 모두 대문자 혹은 모두 소문자로 표기한다.

```js
//변수와 함수명
const PI = 3.14;
let number = 2;

let getSquare = (number) => {
  return number * number;
};


//클래스 명명과 프라이빗 멤버
class StudentInfo {
  let _name;
  let _id;
 
  constructor(name, id) {
    this._name = name;
    this._id = id;
  }
}

import SmsContainer from '';   // bad
const HttpRequests = '';    // bad

import SMSContainer from '';    // good
const HTTPRequests = '';    // good
const httpRequests = '';    // also good

import TextMessageContainer from ''; // best
const requests = ''; // best
```

### 중괄호 블록 {}
- 블록은 열기전에 개행하지 않는다.
- 중괄호 블록은 닫기전에 개행한다.
``` js
if ()	//나쁜 작성
{
}

if () {	//나쁜 작성
  callFunction(); }
  
if () {	//좋은 작성
  callFunction();
}
```

### 제어문
- 제어쿤 키워드 뒤에 한칸의 공백을 가지고 괄호를 사용한다.
- 중괄호는 모든 제어문에서 한 줄의 명령을 갖더라도 반드시 써야한다.
- 단 `if`문에서는 구문이 한 줄의 명령을 가지면, 같은 라인에 명령을 작성하고 중괄호를 생략할 수 있다.
- 조건문의 조건부는 가급적 간단하게 작성한다.
```js
for (let i=0; i<3; i++) callFunction();	//나쁜 작성

for (let i=0; i<3; i++) {	//종은 작성
  callFunction();
}

//단, if문은 다음과 같은 작성을 허용
if () callFunction();

//조건부는 쓸데없이 길어지지 않도록 한다.
if (foo === true)  //나쁜 작성
if (foo)  //좋은 작성
```

### 변수
- 변수 선언에서 var대신 `let`, `const`를 사용한다.
- 한 번의 선언에서 하나의 변수만을 선언한다.
- 문자열은 큰 따옴표(") 대신 `작은 따옴표(')`를 사용한다.
```js
var num1;  //var 선언은 지양할 것. 블록 스코프와 관련한 문제가 있습니다.
let num2;
const num3;

let a, b;  //한 번에 여러개의 선언보단,
let c;
let d;  //나눠서 이용하기

//문자열은 작은 따옴표 이용하기
let str = "문자열입니다.";
let str = '문자열입니다.';
```

### 함수
- 함수의 이름은 `동사` 또는 `동사구문`으로 표기한다.
```js
// bad
function whereIsCamera() { ... }

// good
function findCamera() { ... }
function getFoo() { ... } // getter
function setBar() { ... } // setter
function hasCoo() { ... } // booleans
```
###  기타 구문
- return문을 위한 불필요한 변수 선언을 자제한다.
```js
//나쁜 작성
function() {
  let result;
  
  result = 1+1;
  
  return result;
}

//좋은 작성
function() {
  return 1+1;
}
```

--- 

::: tip
Airbnb의 자바스크립트 코딩컨벤션을 기준으로 작성
:::

## 참조(References)
- 참조형 데이터는 `const`를 사용한다.


> 왜? 참조를 재할당 할 수 없으므로, 버그로 이어지고 이해하기 어려운 코드가 되는것을 방지합니다.
```js
// bad
var a = 1;
var b = 2;

// good
const a = 1;
const b = 2;
```
- 참조를 재할당 해야한다면 var대신 `let`을 사용한다.
```js
// bad
var count = 1;
if (true) {
  count += 1;
}

// good, use the let.
let count = 1;
if (true) {
  count += 1;
}
```
- let과 const는 블록스코프라는것에 유의한다.
```js
// const 와 let 은 선언된 블록의 안에서만 존재합니다.
{
  let a = 1;
  const b = 1;
}
console.log(a); // ReferenceError
console.log(b); // ReferenceError
```

## 오브젝트(Objects)
- 오브젝트를 작성할때는 리터럴 구문을 사용한다.
```js
// bad
const item = new Object();

// good
const item = {};
```

- 예약어를 사용하지 않고, 예약어 대신 알기쉬운 동의어를 사용한다.
```js
// bad
const superman = {
  default: { clark: 'kent' },
  private: true,
};

// good
const superman = {
  defaults: { clark: 'kent' },
  hidden: true,
};

// bad
const superman = {
  class: 'alien',
};

// bad
const superman = {
  klass: 'alien',
};

// good
const superman = {
  type: 'alien',
};
```

- 메소드의 단축구문을 사용한다.
```js
// bad
const atom = {
  value: 1,

  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const atom = {
  value: 1,

  addValue(value) {
    return atom.value + value;
  },
};
```
- 프로퍼티의 단축구문을 사용한다.
```js
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  lukeSkywalker: lukeSkywalker,
};

// good
const obj = {
  lukeSkywalker,
};
```
- 프로퍼티의 단축구문은 오브젝트 선언의 시작부분에 그룹화한다.
```js
const anakinSkywalker = 'Anakin Skywalker';
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  lukeSkywalker,
  episodeThree: 3,
  mayTheFourth: 4,
  anakinSkywalker,
};

// good
const obj = {
  lukeSkywalker,
  anakinSkywalker,
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
};
```

## 배열(Arrays)
- 배열을 작성 할 때는 `리터럴` 구문을 사용한다.
```js
// bad
const items = new Array();

// good
const items = [];
```
- 직접 배열에 항목을 대입하지 말고, `push`를 사용한다.
```js
const someStack = [];

// bad
someStack[someStack.length] = 'abracadabra';

// good
someStack.push('abracadabra');
```

- 배열을 복사할때는 확장연산자(스프레드 연산자) `...`를 사용한다.
```js
// bad
const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];
```

## 구조화대입(Destructuring)
- 하나의 오브젝트에서 복수의 프로퍼티를 엑세스 할 때는 구조화대입을 이용한다.
> 왜? 구조화대입을 이용하는 것으로 프포퍼티를 위한 임시적인 참조의 작성을 줄일 수 있습니다.

```js
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;

  return `${firstName} ${lastName}`;
}

// good
function getFullName(obj) {
  const { firstName, lastName } = obj;
  return `${firstName} ${lastName}`;
}

// best
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}
```
- 구조화대입 예시
```js
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;
```

- 복수의 값을 반환하는 경우 배열의 구조화대입이 아닌 오브젝트의 구조화대입을 이용한다.
> 왜? 이렇게 함으로써 나중에 호출처에 영향을 주지 않고 새로운 프로퍼티를 추가하거나 순서를 변경할 수 있습니다.
```js
// bad
function processInput(input) {
  return [left, right, top, bottom];
}

// 호출처에서 반환된 데이터의 순서를 고려할 필요가 있습니다.
const [left, __, top] = processInput(input);

// good
function processInput(input) {
  return { left, right, top, bottom };
}

// 호출처에서는 필요한 데이터만 선택하면 됩니다.
const { left, right } = processInput(input);
```

## 문자열(Strings)
- 문자열에는 싱글쿼트(single quotes) `''`를 사용한다.
- 100문자 이상의 문자열은 문자열 연결을 사용해서 복수행에 걸쳐 기술한다.
- 문자열연결을 과용하면 성능에 영향을 미칠 수 있습니다.
- 프로그램에서 문자열을 생성하는 경우는 문자열 연결이 아닌 templete strings `(백틱)`을 사용한다.
```js
// bad
function sayHi(name) {
  return 'How are you, ' + name + '?';
}

// bad
function sayHi(name) {
  return ['How are you, ', name, '?'].join();
}

// good
function sayHi(name) {
  return `How are you, ${name}?`;
}
```

## 함수(Functions)
- 익명함수보다 함수선언을 권장한다.
> 왜? 이름이 부여된 함수선언은 콜스택에서 간단하게 확인하는것이 가능합니다. 또한 함수선언은 함수의 본체가 호이스트(hoist)되어지기 때문에 화살표 함수로 이용하는것이 가능합니다.
```js
// bad
const foo = function () {
};

// good
function foo() {
}
```
- 함수이외의 블록(if, while같은)안에서 함수를 선언하지 않는다.
- 파라미터에 `arguments`를 지정하지 않는다. 함수 스코프내에 전해지는 `arguments` 오브젝트를 덮어쓴다.
```js
// bad
function nope(name, options, arguments) {
  // ...stuff...
}

// good
function yup(name, options, args) {
  // ...stuff...
}
```
- `rest syntax`(나머지 매개변수)를 이용한다.
```js
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good
function concatenateAll(...args) {
  return args.join('');
}
```
- 함수 파라미터를 변이시키는 것보다 default 파라미터를 사용한다.
```js
// really bad
function handleThings(opts) {
  // 안돼！함수의 파라메터를 변이시키면 안됩니다.
  // 만약 opts가 falsy 하다면 바라는데로 오브젝트가 설정됩니다.
  // 하지만 미묘한 버그를 일으킬지도 모릅니다.
  opts = opts || {};
  // ...
}

// still bad
function handleThings(opts) {
  if (opts === void 0) {
    opts = {};
  }
  // ...
}

// good
function handleThings(opts = {}) {
  // ...
}
```
- side effect가 있을 default 파라미터의 이용은 피한다.
```js
var b = 1;
// bad
function count(a = b++) {
  console.log(a);
}
count();  // 1
count();  // 2
count(3); // 3
count();  // 3
```
- defalut 파라미터는 뒤쪽에 배치한다.
```js
// bad
function handleThings(opts = {}, name) {
  // ...
}

// good
function handleThings(name, opts = {}) {
  // ...
}
```
- 새 함수를 작성하기 위해 Function constructor를 이용하지 마십시오.
> 왜? 이 방법으로 문자열을 평가시켜 새 함수를 작성하는것은 eval() 과 같은 수준의 취약점을 일으킬 수 있습니다.
```js
// bad
var add = new Function('a', 'b', 'return a + b');

// still bad
var subtract = Function('a', 'b', 'return a - b');
```

## 화살표 함수(Arrow Functions)
- 함수식을 이용하는 경우 화살표 함수 표기를 이용한다.
> 왜? 화살표 함수는 그 Context의 `this`에서 실행하는 버전의 함수를 작성합니다. 
```js
// bad
[1, 2, 3].map(function (x) {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});
```
- 함수의 본체가 하나의 식으로 구성된 경우 중괄호 {}를 생략하고 사용이 가능하다. 그 외에이는 return문을 사용한다.
```js
// good
[1, 2, 3].map(number => `A string containing the ${number}.`);

// bad
[1, 2, 3].map(number => {
  const nextNumber = number + 1;
  `A string containing the ${nextNumber}.`;
});

// good
[1, 2, 3].map(number => {
  const nextNumber = number + 1;
  return `A string containing the ${nextNumber}.`;
});
```
- 식이 복수행에 걸쳐있을 경우는 가독성을 좋게하기 위해 소괄호()로 감싼다.
> 함수의 개시와 종료부분이 알기쉽게 보이기 때문이다.
```js
// bad
[1, 2, 3].map(number => 'As time went by, the string containing the ' +
  `${number} became much longer. So we needed to break it over multiple ` +
  'lines.'
);

// good
[1, 2, 3].map(number => (
  `As time went by, the string containing the ${number} became much ` +
  'longer. So we needed to break it over multiple lines.'
));
```
- 함수의 인수가 하나인 경우 소괄호()를 생략하는게 가능하다.
```js
// good
[1, 2, 3].map(x => x * x);

// good
[1, 2, 3].reduce((y, x) => x + y);
```

## 클래스, 생성자(Classes & Constructors)
- `prototype`을 직접 조작하는것을 피하고 항상 `class`를 사용한다.
> 왜? `class`구문은 간결하고 의미를 알기 쉽기 때문이다.
```js
// bad
function Queue(contents = []) {
  this._queue = [...contents];
}
Queue.prototype.pop = function() {
  const value = this._queue[0];
  this._queue.splice(0, 1);
  return value;
}

// good
class Queue {
  constructor(contents = []) {
    this._queue = [...contents];
  }
  pop() {
    const value = this._queue[0];
    this._queue.splice(0, 1);
    return value;
  }
}
```
- 상속은 `extends`를 사용한다.
> 왜? `instanceof`를 파괴하지 않고 프로토타입 상속을 하기 위해 빌트인된 방법.
```js
// bad
const inherits = require('inherits');
function PeekableQueue(contents) {
  Queue.apply(this, contents);
}
inherits(PeekableQueue, Queue);
PeekableQueue.prototype.peek = function() {
  return this._queue[0];
}

// good
class PeekableQueue extends Queue {
  peek() {
    return this._queue[0];
  }
}
```
- 메소드의 반환값으로는 `this`를 반환하는 것으로 메소드채이닝을 할 수 있다.
```js
// bad
Jedi.prototype.jump = function() {
  this.jumping = true;
  return true;
};

Jedi.prototype.setHeight = function(height) {
  this.height = height;
};

const luke = new Jedi();
luke.jump(); // => true
luke.setHeight(20); // => undefined

// good
class Jedi {
  jump() {
    this.jumping = true;
    return this;
  }

  setHeight(height) {
    this.height = height;
    return this;
  }
}

const luke = new Jedi();

luke.jump()
  .setHeight(20);
```
- toString()을 작성하는것은 허용하지만, 올바르게 동작하는지와 side effect가 없는지 확인해야 한다.
```js
class Jedi {
  constructor(options = {}) {
    this.name = options.name || 'no name';
  }

  getName() {
    return this.name;
  }

  toString() {
    return `Jedi - ${this.getName()}`;
  }
}
```

## 모듈(Modules)
- 비표준 모듈시스템이 아닌 항상 (import/export) 를 이용한다. 
```js
// bad
const StyleGuide = require('./StyleGuide');
module.exports = StyleGuide.es6;

// ok
import StyleGuide from './StyleGuide';
export default StyleGuide.es6;

// best
import { es6 } from './StyleGuide';
export default es6;
```
- whildcard import는 사용하지 않는다.
> 왜? single default export임을 주의할 필요가 있다.
```js
// bad
import * as StyleGuide from './StyleGuide';

// good
import StyleGuide from './StyleGuide';
```

- import문으로부터 직접 export 하는것을 피한다.
> 왜? 한줄짜리는 간결하지만 import와 export방법을 명확히 한가지로 해서 일관성을 갖는다.
```js
// bad
// filename es6.js
export { es6 as default } from './styleGuide';

// good
// filename es6.js
import { es6 } from './StyleGuide';
export default es6;
```

## 이터레이터(Iterators)
- iterators를 서용하지 않는다.. for-of 루프 대신에 map() 과 reduce() 와 같은 JavaScript 고급함수(higher-order functions)를 이용해 주십시오.
> 왜? 고급함수는 immutable(불변)룰을 적용합니다. side effect에 대해 추축하는것보다 값을 반환하는 순수 함수를 다루는게 간단하다.
```js
const numbers = [1, 2, 3, 4, 5];

// bad
let sum = 0;
for (let num of numbers) {
  sum += num;
}

sum === 15;

// good
let sum = 0;
numbers.forEach((num) => sum += num);
sum === 15;

// best (use the functional force)
const sum = numbers.reduce((total, num) => total + num, 0);
sum === 15;
```

## 프로퍼티(Properties)
- 프로퍼티에 억세스하는 경우는 점`.`을 사용한다.
```js
const luke = {
  jedi: true,
  age: 28,
};

// bad
const isJedi = luke['jedi'];

// good
const isJedi = luke.jedi;
```
- 변수를 사용해 프로퍼티에 억세스 하는경우는 대괄호`[]`를 사용한다.
```js
const luke = {
  jedi: true,
  age: 28,
};

function getProp(prop) {
  return luke[prop];
}

const isJedi = getProp('jedi');
```

## 변수(Variables)
- 변수를 선언할 때는 항상 `const`를 사용한다. 그렇게 하지 않으면 글로벌 변수로 선언되기 떄문에 namespace를 오염시킨다.
```js
// bad
superPower = new SuperPower();

// good
const superPower = new SuperPower();
```
- 하나의 변수선언에 대해 하나의 `const`를 사용한다.
> 왜? 이 방법의 경우 간단히 새 변수를 추가하는게 가능하다. 또한 `,`를 `;`로 바꿔버리는것에 대해 걱정할 필요가 없다.
```js
// bad
const items = getItems(),
    goSportsTeam = true,
    dragonball = 'z';

// bad
// (compare to above, and try to spot the mistake)
const items = getItems(),
    goSportsTeam = true;
    dragonball = 'z';

// good
const items = getItems();
const goSportsTeam = true;
const dragonball = 'z';
```
- `const`를 그룹화 하고 다음에 `let`을 그룹하 한다.
> 왜? 이전에 할당한 변수에 대해 나중에 새 변수를 추가하는 경우에 유용하다.
```js
// bad
let i, len, dragonball,
    items = getItems(),
    goSportsTeam = true;

// bad
let i;
const items = getItems();
let dragonball;
const goSportsTeam = true;
let len;

// good
const goSportsTeam = true;
const items = getItems();
let dragonball;
let i;
let length;
```

- 변수를 할당할때는 스코프를 염두에 두고 선언한다.
> 왜? `let`과 `const`는 블록스코프이기 때문이다. 함수스코프가 아니다.
```js
// good
function() {
  test();
  console.log('doing stuff..');

  //..other stuff..

  const name = getName();

  if (name === 'test') {
    return false;
  }

  return name;
}

// bad - unnecessary function call
// 필요없는 함수 호출
function(hasName) {
  const name = getName();

  if (!hasName) {
    return false;
  }

  this.setFirstName(name);

  return true;
}

// good
function(hasName) {
  if (!hasName) {
    return false;
  }

  const name = getName();
  this.setFirstName(name);

  return true;
}
```

## 호이스팅(Hosting)
- `var`선언은 할당이 없이 스코프의 선두에 hoist된다. 
```js
// (notDefined 가 글로벌변수에 존재하지 않는다고 판정한 경우.)
// 잘 동작하지 않습니다.
function example() {
  console.log(notDefined); // => throws a ReferenceError
}

// 그 변수를 참조하는 코드의 뒤에서 그 변수를 선언한 경우
// 변수가 hoist 된 상태에서 동작합니다..
// 주의：`true` 라는 값 자체는 hoist 되지 않습니다.
function example() {
  console.log(declaredButNotAssigned); // => undefined
  var declaredButNotAssigned = true;
}

// 인터프리터는 변수선언을 스코프의 선두에 hoist 합니다.
// 위의 예는 다음과 같이 다시 쓸수 있습니다.
function example() {
  let declaredButNotAssigned;
  console.log(declaredButNotAssigned); // => undefined
  declaredButNotAssigned = true;
}

// const 와 let 을 이용한 경우
function example() {
  console.log(declaredButNotAssigned); // => throws a ReferenceError
  console.log(typeof declaredButNotAssigned); // => throws a ReferenceError
  const declaredButNotAssigned = true;
}
```

- 무명함수의 경우 함수가 할당되기 전의 변수가 hoist 된다.
```js
function example() {
  console.log(anonymous); // => undefined

  anonymous(); // => TypeError anonymous is not a function

  var anonymous = function() {
    console.log('anonymous function expression');
  };
}
```

- 명명함수의 경우도 변수가 hoist된다. 함수명이나 함수본체는 hoist되지 않는다.
```js
function example() {
  console.log(named); // => undefined

  named(); // => TypeError named is not a function

  superPower(); // => ReferenceError superPower is not defined

  var named = function superPower() {
    console.log('Flying');
  };
}

// 함수명과 변수명이 같은 경우도 같은 현상이 발생합니다.
function example() {
  console.log(named); // => undefined

  named(); // => TypeError named is not a function

  var named = function named() {
    console.log('named');
  }
}
```

- 함수선언은 함수명과 함수본체가 hoist된다.
```js
function example() {
  superPower(); // => Flying

  function superPower() {
    console.log('Flying');
  }
}
```

## 조건식과 등가식(Comparison Operator & Equality)
- `==`이나 `!=`보다 `===`와 `!==`를 사용해주세요.
- `if`문과 같은 조건식은 `ToBoolean`메소드에 의한 강제형변환으로 평가되어 항상 다음과 같은 룰을 따른다.
  - 오브젝트는 true로 평가된다.
  - undefined는 false로 평가된다.
  - null은 false로 평가된다
  - 불리언값은 boolean형의 값으로 평가된다.
  - 수치는 true로 평가된다. 하지만 +0, -0, NaN의 경우는 false이다.
  - 문자열은 true로 평가된다. 하지만 빈문자 `''`는 false이다.
- 단축형을 사용한다.
```js
// bad
if (name !== '') {
  // ...stuff...
}

// good
if (name) {
  // ...stuff...
}

// bad
if (collection.length > 0) {
  // ...stuff...
}

// good
if (collection.length) {
  // ...stuff...
}
```

## 블록(Blocks)
- 복수행의 블록에는 중괄호 ({})를 사용한다.
```js
// bad
if (test)
  return false;

// good
if (test) return false;

// good
if (test) {
  return false;
}

// bad
function() { return false; }

// good
function() {
  return false;
}
```
- 복수행 블록의 `if`와 `else`를 이용하는 경우 `else`는 `if` 블록 끝의 중괄호(})와 같은 행에 위치한다.
```js
// bad
if (test) {
  thing1();
  thing2();
}
else {
  thing3();
}

// good
if (test) {
  thing1();
  thing2();
} else {
  thing3();
}
```

## 코멘(Commnets)
- 복수행의 코멘트는 `/** ... */`를 사용한다. 그 안에는 설명과 모든 파라미터, 반환값에 대해 형이나 값을 서술한다.
```js
// bad
// make() returns a new element
// based on the passed in tag name
//
// @param {String} tag
// @return {Element} element
function make(tag) {

  // ...stuff...

  return element;
}

// good
/**
 * make() returns a new element
 * based on the passed in tag name
 *
 * @param {String} tag
 * @return {Element} element
 */
function make(tag) {

  // ...stuff...

  return element;
}
```
- 단일형 코멘트에는 `/`를 사용한다. 코멘트를 추가하고 싶은 코드의 상부에 배치한다. 또한, 코멘트의 앞에 빈행을 넣어준다.
```js
// bad
const active = true;  // is current tab

// good
// is current tab
const active = true;

// bad
function getType() {
  console.log('fetching type...');
  // set the default type to 'no type'
  const type = this._type || 'no type';

  return type;
}

// good
function getType() {
  console.log('fetching type...');

  // set the default type to 'no type'
  const type = this._type || 'no type';

  return type;
}

// also good
function getType() {
  // set the default type to 'no type'
  const type = this._type || 'no type';

  return type;
}
17.3
```
- 코멘트의 앞에 `FIXME`나 `TODO`를 붙이는 것으로 다른 개발자의 빠른 이해를 도울수 있다.
- `FIXME -- 해결이 필요`또는 `TODO -- 구현이 필요`를 뜻함.
- 문제에 대한 주석으로써 `// FIXME: `를 사용한다.
```js
class Calculator extends Abacus {
  constructor() {
    super();

    // FIXME: 글로벌변수를 사용해서는 안됨.
    total = 0;
  }
}
```
- 문제의 해결책에 대한 주석으로 `// TODO:` 를 사용한다.
```js
class Calculator extends Abacus {
  constructor() {
    super();

    // TODO: total 은 옵션 파라메터로 설정해야함.
    this.total = 0;
  }
}
```

## 공백(Whitespace)
- 탭에는 스페이스 2개를 설정한다.
```js
// bad
function() {
∙∙∙∙const name;
}

// bad
function() {
∙const name;
}

// good
function() {
∙∙const name;
}
```
- 주요 중괄호 ({})앞에는 스페이스를 1개 넣어준다.
```js
// bad
function test(){
  console.log('test');
}

// good
function test() {
  console.log('test');
}

// bad
dog.set('attr',{
  age: '1 year',
  breed: 'Bernese Mountain Dog',
});

// good
dog.set('attr', {
  age: '1 year',
  breed: 'Bernese Mountain Dog',
});
```
- 제어구문(`if`문이나 `while`문 등)의 소괄호({})앞에는 스페이스를 1개 넣어준다.
```js
// bad
if(isJedi) {
  fight ();
}

// good
if (isJedi) {
  fight();
}

// bad
function fight () {
  console.log ('Swooosh!');
}

// good
function fight() {
  console.log('Swooosh!');
}
```
- 연산자 사이에는 스페이스를 넣어준다.
```js
// bad
const x=y+5;

// good
const x = y + 5;
```
- 파일끝에는 개행문자를 1개 넣어준다.
```js
// bad
(function(global) {
  // ...stuff...
})(this);
```
```js
// bad
(function(global) {
  // ...stuff...
})(this);↵
↵
```
```js
// good
(function(global) {
  // ...stuff...
})(this);↵
```
- 길게 메소드 채이닝을 하는 경우 인덴트를 이용한다. 행이 새로운 문이 아닌 메소드 호출인것을 강조하기 위해 선두에 `.`을 배치한다.
```js
// bad
$('#items').find('.selected').highlight().end().find('.open').updateCount();

// bad
$('#items').
  find('.selected').
    highlight().
    end().
  find('.open').
    updateCount();

// good
$('#items')
  .find('.selected')
    .highlight()
    .end()
  .find('.open')
    .updateCount();

// bad
const leds = stage.selectAll('.led').data(data).enter().append('svg:svg').class('led', true)
    .attr('width', (radius + margin) * 2).append('svg:g')
    .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
    .call(tron.led);

// good
const leds = stage.selectAll('.led')
    .data(data)
  .enter().append('svg:svg')
    .classed('led', true)
    .attr('width', (radius + margin) * 2)
  .append('svg:g')
    .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
    .call(tron.led);
```
- 블록의 뒤에는 빈행을 남겨준다.
```js
// bad
if (foo) {
  return bar;
}
return baz;

// good
if (foo) {
  return bar;
}

return baz;

// bad
const obj = {
  foo() {
  },
  bar() {
  },
};
return obj;

// good
const obj = {
  foo() {
  },

  bar() {
  },
};

return obj;

// bad
const arr = [
  function foo() {
  },
  function bar() {
  },
];
return arr;

// good
const arr = [
  function foo() {
  },

  function bar() {
  },
];

return arr;
```

- 블록에 빈행을 끼워넣지 않는다.
```js
// bad
function bar() {

  console.log(foo);

}

// also bad
if (baz) {

  console.log(qux);
} else {
  console.log(foo);

}

// good
function bar() {
  console.log(foo);
}

// good
if (baz) {
  console.log(qux);
} else {
  console.log(foo);
}
```

- 소괄호()의 안쪽에 스페이스를 추가하지 않는다.
```js
// bad
function bar( foo ) {
  return foo;
}

// good
function bar(foo) {
  return foo;
}

// bad
if ( foo ) {
  console.log(foo);
}

// good
if (foo) {
  console.log(foo);
}
```
- 대괄호([])의 안쪽에 스페이스를 추가하지 않는다.
```js
// bad
const foo = [ 1, 2, 3 ];
console.log(foo[ 0 ]);

// good
const foo = [1, 2, 3];
console.log(foo[0]);
```

## 콤마(Commas)
 - 선두의 콤마는 사용하지 않는다.
```js
// bad
const story = [
    once
  , upon
  , aTime
];

// good
const story = [
  once,
  upon,
  aTime,
];

// bad
const hero = {
    firstName: 'Ada'
  , lastName: 'Lovelace'
  , birthYear: 1815
  , superPower: 'computers'
};

// good
const hero = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  birthYear: 1815,
  superPower: 'computers',
};
```
> 왜? git, babel과 같은 트랜스파일러는 transplie하는 사이에 끝의 콤마를 제거한다. 레거시브라우저에서의 불피요한 콤메 문제를 고민할 필요가 없다.
```js
// bad - git diff without trailing comma
const hero = {
     firstName: 'Florence',
-    lastName: 'Nightingale'
+    lastName: 'Nightingale',
+    inventorOf: ['coxcomb graph', 'modern nursing']
};

// good - git diff with trailing comma
const hero = {
     firstName: 'Florence',
     lastName: 'Nightingale',
+    inventorOf: ['coxcomb chart', 'modern nursing'],
};

// bad
const hero = {
  firstName: 'Dana',
  lastName: 'Scully'
};

const heroes = [
  'Batman',
  'Superman'
];

// good
const hero = {
  firstName: 'Dana',
  lastName: 'Scully',
};

const heroes = [
  'Batman',
  'Superman',
];
```
## 세미콜론(SemiColons)
 - 세미콜론을 사용한다.
```js
// bad
(function() {
  const name = 'Skywalker'
  return name
})()

// good
(() => {
  const name = 'Skywalker';
  return name;
})();


// good (즉시함수가 연결된 2개의 파일일때 인수가 되는 부분을 보호합니다.
;(() => {
  const name = 'Skywalker';
  return name;
})();
```

## 형변환과 강제(Type Casting & Coercion)
- 문의 선두에서 형의 강제를 행한다.
- 문자열의 경우 :
```js
//  => this.reviewScore = 9;

// bad
const totalScore = this.reviewScore + '';

// good
const totalScore = String(this.reviewScore);
```
- 수치의 경우: `Number`로 형변환하는 경우는 `parseInt`를 이용하고, 항상 형변환을 위한 기수를 인수로 넘겨준다.
```js
const inputValue = '4';

// bad
const val = new Number(inputValue);

// bad
const val = +inputValue;

// bad
const val = inputValue >> 0;

// bad
const val = parseInt(inputValue);

// good
const val = Number(inputValue);

// good
const val = parseInt(inputValue, 10);
```

- 불리언값의 경우
```js
const age = 0;

// bad
const hasAge = new Boolean(age);

// good
const hasAge = Boolean(age);

// good
const hasAge = !!age;
```

## 명명규칙(Naming Conventions)
- 문자의 이름은 피한다. 이름으로부터 의도가 읽혀질수 있게 한다.
```js
// bad
function q() {
  // ...stuff...
}

// good
function query() {
  // ..stuff..
}
```
- 클래스나 constructor에는 PascalCase를 사용한다.
```js
// bad
function user(options) {
  this.name = options.name;
}

const bad = new user({
  name: 'nope',
});

// good
class User {
  constructor(options) {
    this.name = options.name;
  }
}

const good = new User({
  name: 'yup',
});
```
- private 프로퍼니명은 선두에 언더스코어 `_`를 사용한다.
```js
// bad
this.__firstName__ = 'Panda';
this.firstName_ = 'Panda';

// good
this._firstName = 'Panda';
```
- `this`의 참조를 보존하는것을 피한다. 화살표 함수나 function#bind를 이용한다.
```js
// bad
function foo() {
  const self = this;
  return function() {
    console.log(self);
  };
}

// bad
function foo() {
  const that = this;
  return function() {
    console.log(that);
  };
}

// good
function foo() {
  return () => {
    console.log(this);
  };
}
```
- 파일을 1개의 클래스로 export 하는 경우, 파일명은 클래스명과 완전히 일치시키지 않으면 안된다.
```js
// file contents
class CheckBox {
  // ...
}
export default CheckBox;

// bad
import CheckBox from './checkBox';

// bad
import CheckBox from './check_box';

// good
import CheckBox from './CheckBox';
```
- Default export가 함수일경우, camelCase를 이용한다. 파일명은 함수명과 동일해야 한다.
```js
function makeStyleGuide() {
}

export default makeStyleGuide;
```
- singleton, function library, 빈 오브젝틀르 export하는 경우, PascalCase를 이용한다.
```js
const StyleGuide = {
  es6: {
  }
};

export default StyleGuide;
```