# Typescript

## 기본타입

타입스크립트로 변수나 함수와 같은 자바스크립트 코드에 타입을 정의할 수 있습니다.
타입스크립트의 기본 타입에는 크게 다음 12가지가 있습니다.

- Boolean
- Number
- String
- Object
- Array
- Tuple
- Enum
- any
- void
- null
- undefined
- never
- String

### String

자바스크립트 변수의 타입이 문자열인 경우 아래와 같이 선언해서 사용합니다.

```ts
let str: string = "hi";
```

::: tip
위와 같이 :를 이용하여 자바스크립트 코드에 타입을 정의하는 방식을 타입 표기(Type Annotation)라고 합니다.
:::

### Number

타입이 숫자이면 아래와 같이 선언합니다.

```ts
let num: number = 10;
```

### Boolean

타입이 진위 값인 경우에는 아래와 같이 선언합니다.

```ts
let isLoggedIn: boolean = false;
```

### Object

### Array

타입이 배열인 경우 간단하게 아래와 같이 선언합니다.

```ts
let arr: number[] = [1, 2, 3];
```

또는 아래와 같이 제네릭을 사용할 수 있습니다.

```ts
let arr: Array<number> = [1, 2, 3];
```

### Tuple

튜플은 배열의 길이가 고정되고 각 요소의 타입이 지정되어 있는 배열 형식을 의미합니다.

```ts
let arr: [string, number] = ["hi", 10];
```

만약 정의하지 않은 타입, 인덱스로 접근할 경우 오류가 납니다.

```ts
arr[1].concat("!"); // Error, 'number' does not have 'concat'
arr[5] = "hello"; // Error, Property '5' does not exist on type '[string, number]'.
```

### Enum

이넘은 C, Java와 같은 다른 언어에서 흔하게 쓰이는 타입으로 특정 값(상수)들의 집합을 의미합니다.

```ts
enum Avengers {
  Capt,
  IronMan,
  Thor,
}
let hero: Avengers = Avengers.Capt;
```

이넘은 인덱스 번호로도 접근할 수 있습니다.

```ts
enum Avengers {
  Capt,
  IronMan,
  Thor,
}
let hero: Avengers = Avengers[0];
```

만약 원한다면 이넘의 인덱스를 사용자 편의로 변경하여 사용할 수도 있습니다.

```ts
enum Avengers {
  Capt = 2,
  IronMan,
  Thor,
}
let hero: Avengers = Avengers[2]; // Capt
let hero: Avengers = Avengers[4]; // Thor
```

### any

기존에 자바스크립트로 구현되어 있는 웹 서비스 코드에 타입스크립트를 점진적으로 적용할 때 활용하면 좋은 타입입니다. 단어 의미 그대로 모든 타입에 대해서 허용한다는 의미를 갖고 있습니다.

```ts
let str: any = "hi";
let num: any = 10;
let arr: any = ["a", 2, true];
```

### void

반환 값이 없는 함수의 반환 타입입니다. 아래와 같이 return이 없거나 return이 있더라도 반환하는 값이 없으면 함수의 반환 타입을 void로 지정합니다.

```ts
function printSomething(): void {
  console.log("sth");
}
function returnNothing(): void {
  return;
}
```

### Never

함수의 끝에 절대 도달하지 않는다는 의미를 지닌 타입입니다.

```ts
// 이 함수는 절대 함수의 끝까지 실행되지 않는다는 의미
function neverEnd(): never {
  while (true) {}
}
```

## 함수

웹 애플리케이션을 구현할 때 자주 사용되는 함수는 타입스크립트로 크게 다음 3가지 타입을 정의할 수 있습니다.

- 함수의 파라미터(매개변수) 타입
- 함수의 반환 타입
- 함수의 구조 타입

### 함수의 기본적인 타입 선언

타입스크립트의 함수 선언 방법을 이해하기 위해 먼저 간단한 자바스크립트 함수를 보겠습니다.

```js
function sum(a, b) {
  return a + b;
}
```

위 자바스크립트 함수에 타입을 부여하면 아래와 같습니다.

```ts
function sum(a: number, b: number): number {
  return a + b;
}
```

기존 자바스크립트 함수의 선언 방식에서 매개변수와 함수의 반환 값에 타입을 추가하였습니다.

::: tip
함수의 반환 값에 타입을 정하지 않을 때는 void라도 사용
:::

### 함수의 인자

타입스크립트에서는 함수의 인자를 모두 필수 값으로 간주합니다. 따라서, 함수의 매개변수를 설정하면 undefined나 null이라도 인자로 넘겨야하며 컴파일러에서 정의된 매개변수 값이 넘어 왔는지 확인합니다. 달리 말하면 정의된 매개변수 값만 받을 수 있고 추가로 인자를 받을 수 없다는 의미입니다.

```ts
function sum(a: number, b: number): number {
  return a + b;
}
sum(10, 20); // 30
sum(10, 20, 30); // error, too many parameters
sum(10); // error, too few parameters
```

위와 같은 특성은 정의된 매개변수의 갯수 만큼 인자를 넘기지 않아도 되는 자바스크립트의 특성과 반대됩니다. 만약 이러한 특성을 살리고 싶다면 ?를 이용해서 아래와 같이 정의할 수 있습니다.

```ts
function sum(a: number, b?: number): number {
  return a + b;
}
sum(10, 20); // 30
sum(10, 20, 30); // error, too many parameters
sum(10); // 타입 에러 없음
```

매개변수 초기화는 ES6 문법과 동일합니다.

```js
function sum(a: number, b = "100"): number {
  return a + b;
}
sum(10, undefined); // 110
sum(10, 20, 30); // error, too many parameters
sum(10); // 110
```

### REST 문법이 적용된 매개변수

ES6 문법에서 지원하는 Rest 문법은 타입스크립트에서 다음과 같이 사용할 수 있습니다.

```ts
function sum(a: number, ...nums: number[]): number {
  const totalOfNums = 0;
  for (let key in nums) {
    totalOfNums += nums[key];
  }
  return a + totalOfNums;
}
```

### this

타입스크립트에서 자바스크립트의 `this`가 잘못 사용되었을 때 감지할 수 있습니다.

```ts
function 함수명(this: 타입) {}
```

## 인터페이스

인터페이스는 상호 간에 정의한 약속 혹은 규칙을 의미합니다. 타입스크립트에서의 인터페이스는 보통 다음과 같은 범주에 대해 약속을 정의할 수 있습니다.

- 객체의 스펙(속성과 속성의 타입)
- 함수의 파라미터
- 함수의 스펙(파라미터, 반환 타입 등)
- 배열과 객체를 접근하는 방식
- 클래스

### 인터페이스 간략 예제

```ts
let person = { name: "Capt", age: 28 };

function logAge(obj: { age: number }) {
  console.log(obj.age); // 28
}
logAge(person); // 28
```

위 logAge() 함수에서 받는 인자의 형태는 age를 속성으로 갖는 객체입니다. 이렇게 인자를 받을 때 단순한 타입 뿐만 아니라 객체의 속성 타입까지 정의할 수 있죠.

```ts
interface personAge {
  age: number;
}

function logAge(obj: personAge) {
  console.log(obj.age);
}
let person = { name: "Capt", age: 28 };
logAge(person);
```

이제는 `logAge()`의 인자가 좀 더 명시적으로 바뀌었습니다. `logAge()`의 인자는 `personAge` 라는 타입을 가져야한다

인터페이스를 인자로 받아 사용할 때 항상 인터페이스의 속성 갯수와 인자로 받는 객체의 속성 갯수를 일치시키지 않아도 된다.

> 다시 말해, 인터페이스에 정의된 속성, 타입의 조건만 만족한다면 객체의 속성 갯수가 더 많아도 상관 없다는 의미.
> 또한, 인터페이스에 선언된 속성 순서를 지키지 않아도 됩니다.

### 옵션 속성

인터페이스 사용시 인터페이스에 정의되어 있는 모든 속성을 사용하지 않아도 된다.

```ts
interface 인터페이스_이름 {
  속성?: 타입;
}
```

속성 끝에 `?`를 붙여 사용한다.

```ts
interface CraftBeer {
  name: string;
  hop?: number;
}

let myBeer = {
  name: "Saporo",
};
function brewBeer(beer: CraftBeer) {
  console.log(beer.name); // Saporo
}
brewBeer(myBeer);
```

코드를 보면 `brewBeer()` 함수에서 `Beer` 인터페이스를 인자의 타입으로 선언했음에도 불구하고, 인자로 넘긴 객체에는 `hop` 속성이 없습니다. 왜냐하면 `hop`을 옵션 속성으로 선언했기 때문.

### 옵션속성의 장점

인터페이스를 사용할 때 속성을 선택적으로 적용할 수 있는다는것 뿐 아니라 인터페이스에 정의되어 있지 않은 속성에 대해 인지시켜줄 수 있다.

```ts
interface CraftBeer {
  name: string;
  hop?: number;
}

let myBeer = {
  name: "Saporo",
};
function brewBeer(beer: CraftBeer) {
  console.log(beer.brewery); // Error: Property 'brewery' does not exist on type 'Beer'
}
brewBeer(myBeer);
```

인터페이스에 정의되어 있지 않은 속성에 대해서 오류를 표시합니다.

```ts
interface CraftBeer {
  name: string;
  hop?: number;
}

function brewBeer(beer: CraftBeer) {
  console.log(beer.nam); // Error: Property 'nam' does not exist on type 'Beer'
}
```

### 읽기 전용 속성

인터페이스 객체를 처음 생성할 때만 값을 할당하고 그 이후에는 변경할 수 없다. `readonly`속성을 앞에 붙여 사용한다.

```ts
interface Craftbeer {
  readonly brand: string;
}
```

인터페이스 객체로 선언 후 수정하려고 하면 다음과 같은 오류가 발생한다.

```ts
let myBeer: Craftbeer = {
  bradn: "brandName",
};
myBeer.brand = "secondary"; // error
```

### 읽기 전용 배열

배열을 선언할때 `ReadonlyArray<T>` 타입을 사용하여 읽기전용 배열을 생성할 수 있다.

```ts
let arr: ReadonlyArray<Number> = [1, 2, 3];
arr.splice(0, 1); // error
arr.push(4); // error
arr[0] = 100; // error
```

### 객체 선언과 관련된 타입 체킹

타입스크립트는 인터페이스를 이용하여 객체를 선언할 때 좀 더 엄밀한 속성 검사를 진행합니다.

```ts
interface CraftBeer {
  brand?: string;
}

function brewBeer(beer: CraftBeer) {
  // ..
}
brewBeer({ brandon: "what" }); // error: Object literal may only specify known properties, but 'brandon' does not exist in type 'CraftBeer'. Did you mean to write 'brand'?
```

위 코드를 보면 CraftBeer 인터페이스에는 brand라고 선언되어 있지만 brewBeer() 함수에 인자로 넘기는 myBeer 객체에는 brandon이 선언되어 있어 오탈자 점검을 요하는 오류가 납니다.

만약 이런 타입 추론을 무시하고 싶다면 아래와 같이 선언합니다.

```ts
let myBeer = { brandon: 'what' }';
brewBeer(myBeer as CraftBeer);
```

그럼에도 불구하고 만약 인터페이스 정의하지 않은 속성들을 추가로 사용하고 싶을 때는 아래와 같은 방법을 사용합니다.

```ts
interface CraftBeer {
  brand?: string;
  [propName: string]: any;
}
```

### 함수 타입

인터페이스는 함수의 타입을 정의할 때에도 사용할 수 있다.

```ts
interface login {
  (userName: string, password: string): boolean;
}
```

함수의 인자의 타입과 반환값의 타입을 정한다.

```ts
let loginUser = login;
loginUser = function (id: string, pw: string) {
  return true;
};
```

### 클래스 타입

클래스가 일정조건을 만족하도록 타입 규칙을 정할 수 있다.

```ts
interface CraftBeer {
  beerName: string;
  nameBeer(beer: string): void;
}

class myBeer implements CraftBeer {
  beerName: string = "myBeerName";
  nameBeer(b: string) {
    this.beerName = b;
  }
  constructor() {}
}
```

### 인터페이스 확장

클래스와 마찬가지로 인터페이스도 인터페이스간 확장이 가능하다.

```ts
interface Person {
  name: string;
}

interface Developer extends Person {
  skill: string;
}

let fe = {} as Developer;
fe.name = "sam";
fe.skill = "TypeScript";
```

혹은 여러 인터페이스를 상속받아 사용할 수 있다.

```ts
interface Person {
  name: string;
}

interface Drinker {
  drink: string;
}

interface Developer extends Person {
  skill: string;
}

let fe = {} as Developer;
fe.name = "sam";
fe.skill = "TypeScript";
fe.drink = "drink";
```

### 하이브리드 타입

자바스크립트의 유연하고 동적인 타입 특성에 따라 인터페이스 역시 여러 가지 타입을 조합하여 만들 수 있습니다. 예를 들어, 다음과 같이 함수 타입이면서 객체 타입을 정의할 수 있는 인터페이스가 있습니다.

```ts
interface CraftBeer {
  (beer: string): string;
  brand: string;
  brew(): void;
}

function myBeer(): CraftBeer {
  let my = function (beer: string) {} as CraftBeer;
  my.brand = "Beer Kitchen";
  my.brew = function () {};
  return my;
}

let brewedBeer = myBeer();
brewedBeer("My First Beer");
brewedBeer.brand = "Pangyo Craft";
brewedBeer.brew();
```

## 이넘(Enums)

이넘은 특정 값들의 집합을 의미하는 자료형입니다. 타입스크립트에서는 문자형 이넘과 숫자형 이넘을 지원합니다

### 숫자형 이넘

타입스크립트에서 숫자형 이넘은 아래와 같이 선언합니다.

```ts
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
```

위와 같이 숫자형 이넘을 선언할 때 초기 값을 주면 초기 값부터 차례로 1씩 증가합니다.

```ts
Up - 1;
Down - 2;
Left - 3;
Right - 4;
```

만약 아래와 같이 초기 값을 주지 않으면 0부터 차례로 1씩 증가합니다.

```ts
enum Direction {
  Up, // 0
  Down, // 1
  Left, // 2
  Right, // 3
}
```

### 숫자형 이넘 사용하기

이렇게 선언한 이넘은 아래와 같이 사용할 수 있습니다.

```ts
enum Response {
  No = 0,
  Yes = 1,
}

function respond(recipient: string, message: Response): void {
  // ...
}

respond("Captain Pangyo", Response.Yes);
```

그리고 숫자형 이넘에서 주의할 점은 선언할 때 만약 이넘 값에 다른 이넘 타입의 값을 사용하면 선언하는 이넘의 첫 번째 값에 초기화를 해줘야 한다는 점입니다.

```ts
enum Wrong {
  A = getSomeValue(),
  B, // Error, 초기화가 필요합니다.
}
```

### 문자형 이넘

문자형 이넘은 숫자형 이넘과 개념적으로는 거의 비슷합니다. 다만, 런타임에서의 미세한 차이가 있습니다.

> 문자형 이넘은 이넘 값 전부 다 특정 문자 또는 다른 이넘 값으로 초기화 해줘야 합니다.

```ts
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
```

또한, 문자형 이넘에는 숫자형 이넘과는 다르게 auto-incrementing이 없습니다. 대신 디버깅을 할 때 숫자형 이넘의 값은 가끔 불명확하게 나올 떄가 있지만 문자형 이넘은 항상 명확한 값이 나와 읽기 편합니다.

### 복합 이넘 (Heterogeneous Enums)

기술적으로 이넘에 문자와 숫자를 혼합하여 생성할 순 있습니다.

```ts
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES",
}
```

> 하지만 이 방식을 권고하진 않습니다. 최대한 같은 타입으로 이루어진 이넘을 사용하세요.

### 런타임 시점에서의 이넘 특징

이넘은 런타임시에 실제 객체 형태로 존재합니다. 예를 들어 아래와 같은 이넘 코드가 있을 때

```ts
enum E {
  X,
  Y,
  Z,
}

function getX(obj: { X: number }) {
  return obj.X;
}
getX(E); // 이넘 E의 X는 숫자이기 때문에 정상 동작
```

### 컴파일 시점에서의 이넘 특징

이넘이 런타임 시점에서는 실제 객체지만 keyof를 사용할 때 주의해야 합니다. 일반적으로 keyof를 사용해야 되는 상황에서는 대신 keyof typeof를 사용하세요.

```ts
enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}

// 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
type LogLevelStrings = keyof typeof LogLevel;

function printImportant(key: LogLevelStrings, message: string) {
  const num = LogLevel[key];
  if (num <= LogLevel.WARN) {
    console.log("Log level key is: ", key);
    console.log("Log level value is: ", num);
    console.log("Log level message is: ", message);
  }
}
printImportant("ERROR", "This is a message");
```

### 리버스 매핑(Reverse Mapping)

리버스 매핑은 숫자형 이넘에만 존재하는 특징입니다. 에넘의 키(key)로 값(value)를 얻을 수 있고 값(value)로 키(key)를 얻을 수도 있습니다.

```ts
enum Enum {
  A,
}
let a = Enum.A; // 키로 값을 획득 하기
let keyName = Enum[a]; // 값으로 키를 획득 하기
```

> 위와 같은 리버스 매핑은 문자형 이넘에는 존재하지 않습니다.

## 연산자를 이용한 타입 정의

### Union Type

유니온 타입(Union Type)이란 자바스크립트의 OR 연산자(`||`)와 같이 A이거나 B이다 라는 의미의 타입입니다. 아래 코드를 보겠습니다.

```ts
function logText(text: string | number) {
  // ...
}
```

위 함수의 파라미터 `text`에는 문자열 타입이나 숫자 타입이 모두 올 수 있습니다. 이처럼 `|` 연산자를 이용하여 타입을 여러 개 연결하는 방식을 유니온 타입 정의 방식이라고 부릅니다.

### Union Type의 장점

유니온 타입의 장점은 아래 2개의 코드를 비교하면 바로 알 수 있습니다.

```ts
// any를 사용하는 경우
function getAge(age: any) {
  age.toFixe(); // 에러 발생, age의 타입이 any로 추론되기 때문에 숫자 관련된 API를 작성할 때 코드가 자동 완성되지 않는다.
  return age;
}

// 유니온 타입을 사용하는 경우
function getAge(age: number | string) {
  if (typeof age === "number") {
    age.toFixed(); // 정상 동작, age의 타입이 `number`로 추론되기 때문에 숫자 관련된 API를 쉽게 자동완성 할 수 있다.
    return age;
  }
  if (typeof age === "string") {
    return age;
  }
  return new TypeError("age must be number or string");
}
```

이처럼 `any`를 사용하는 경우 마치 자바스크립트로 작성하는 것처럼 동작을 하고 유니온 타입을 사용하면 타입스크립트의 이점을 살리면서 코딩할 수 있습니다.

### Intersection Type

인터섹션 타입(Intersection Type)은 여러 타입을 모두 만족하는 하나의 타입을 의미합니다.

```ts
interface Person {
  name: string;
  age: number;
}
interface Developer {
  name: string;
  skill: number;
}
type Capt = Person & Developer;
```

위 코드는 `Person` 인터페이스의 타입 정의와 `Developer` 인터페이스의 타입 정의를 `&` 연산자를 이용하여 합친 후 `Capt` 이라는 타입에 할당한 코드입니다. 결과적으로 `Capt`의 타입은 아래와 같이 정의됩니다.

```ts
{
  name: string;
  age: number;
  skill: string;
}
```

### Union Type을 쓸 때 주의할 점

앞에서 유니온 타입과 인터섹션 타입을 살펴봤습니다. 아마 논리적으로 유니온 타입은 OR, 인터섹션은 AND라고 생각하시는 분들이 있을텐데요. 인터페이스와 같은 타입을 다룰 때는 이와 같은 논리적 사고를 주의하셔야 합니다.

```ts
interface Person {
  name: string;
  age: number;
}
interface Developer {
  name: string;
  skill: string;
}
function introduce(someone: Person | Developer) {
  someone.name; // O 정상 동작
  someone.age; // X 타입 오류
  someone.skill; // X 타입 오류
}
```

여기서 `introduce()` 함수의 파라미터 타입을 `Person`, `Developer` 인터페이스의 유니온 타입으로 정의하였는데요. 유니온 타입은 A도 될 수 있고 B도 될 수 있는 타입이지라고 생각하면 파라미터의 타입이 `Person`도 되고 `Developer`도 될테니까 함수 안에서 당연히 이 인터페이스들이 제공하는 속성들인 `age`나 `skill`를 사용할 수 있겠지라고 생각할 수 있습니다. 하지만, 타입스크립트 관점에서는 `introduce()` 함수를 호출하는 시점에 `Person` 타입이 올지 `Developer` 타입이 올지 알 수가 없기 때문에 어느 타입이 들어오든 간에 오류가 안 나는 방향으로 타입을 추론하게 됩니다.

```ts
const capt: Person = { name: "capt", age: 100 };
introduce(capt); // 만약 `introduce` 함수 안에서 `someone.skill` 속성을 접근하고 있으면 함수에서 오류 발생
```

```ts
const tony: Developer = { name: "tony", skill: "iron making" };
introduce(tony); // 만약 `introduce` 함수 안에서 `someone.age` 속성을 접근하고 있으면 함수에서 오류 발생
```

결과적으로 `introduce()` 함수 안에서는 별도의 `타입 가드(Type Guard)`를 이용하여 타입의 범위를 좁히지 않는 이상 기본적으로는 `Person`과 `Developer` 두 타입에 공통적으로 들어있는 속성인 name만 접근할 수 있게 됩니다.

```ts
function introduce(someone: Person | Developer) {
  console.log(someone.name); // O 정상 동작
}
```

## 클래스

### readonly

클래스의 속성에 readonly 키워드를 사용하면 아래와 같이 접근만 가능합니다.

```ts
class Developer {
  readonly name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}
let john = new Developer("John");
john.name = "John"; // error! name is readonly.
```

이처럼 `readonly`를 사용하면 `constructor()` 함수에 초기 값 설정 로직을 넣어줘야 하므로 다음과 같이 인자에 `readonly` 키워드를 추가해서 코드를 줄일 수 있습니다.

```ts
class Developer {
  readonly name: string;
  constructor(readonly name: string) {}
}
```

### Accessor

타입스크립트는 객체의 특정 속성의 접근과 할당에 대해 제어할 수 있습니다. 이를 위해선 해당 객체가 클래스로 생성한 객체여야 합니다. 아래의 간단한 예제를 봅시다.

```ts
class Developer {
  name: string;
}
const josh = new Developer();
josh.name = "Josh Bolton";
```

위 코드는 클래스로 생성한 객체의 `name` 속성에 `Josh Bolton`이라는 값을 대입한 코드입니다. 이제 josh라는 객체의 name 속성은 Josh Bolton이라는 값을 갖겠죠.

여기서 만약 `name` 속성에 제약 사항을 추가하고 싶다면 아래와 같이 `get`과 `set`을 활용합니다.

```ts
class Developer {
  private name: string;

  get name(): string {
    return this.name;
  }

  set name(newValue: string) {
    if (newValue && newValue.length > 5) {
      throw new Error("이름이 너무 깁니다");
    }
    this.name = newValue;
  }
}
const josh = new Developer();
josh.name = "Josh Bolton"; // Error
josh.name = "Josh";
```

::: tip
get만 선언하고 set을 선언하지 않는 경우에는 자동으로 readonly로 인식됩니다.
:::

### Abstract Class

추상 클래스(Abstract Class)는 인터페이스와 비슷한 역할을 하면서도 조금 다른 특징을 갖고 있습니다. 추상 클래스는 특정 클래스의 상속 대상이 되는 클래스이며 좀 더 상위 레벨에서 속성, 메서드의 모양을 정의합니다.

```ts
abstract class Developer {
  abstract coding(): void; // 'abstract'가 붙으면 상속 받은 클래스에서 무조건 구현해야 함
  drink(): void {
    console.log("drink sth");
  }
}

class FrontEndDeveloper extends Developer {
  coding(): void {
    // Developer 클래스를 상속 받은 클래스에서 무조건 정의해야 하는 메서드
    console.log("develop web");
  }
  design(): void {
    console.log("design web");
  }
}
const dev = new Developer(); // error: cannot create an instance of an abstract class
const josh = new FrontEndDeveloper();
josh.coding(); // develop web
josh.drink(); // drink sth
josh.design(); // design web
```

## 제네릭

### 제네릭(Generics)의 정의

제네릭은 C#, Java 등의 언어에서 재사용성이 높은 컴포넌트를 만들 때 자주 활용되는 특징입니다. 특히, 한가지 타입보다 여러 가지 타입에서 동작하는 컴포넌트를 생성하는데 사용됩니다.

### 정의와 예시

**제네릭이란 타입을 마치 함수의 파라미터처럼 사용하는 것**을 의미합니다. 아래 코드를 보겠습니다.

```ts
function getText(text) {
  return text;
}

getText("hi"); // 'hi'
getText(10); // 10
getText(true); // true
```

위 함수는 text라는 파라미터에 값을 넘겨 받아 text를 반환해줍니다. hi, 10, true 등 어떤 값이 들어가더라도 그대로 반환합니다.
이 관점에서 제네릭을 한번 살펴보겠습니다.

```ts
function getText<T>(text: T): T {
  return text;
}
```

위 함수는 제네릭 기본 문법이 적용된 형태입니다. 이제 함수를 호출할 때 아래와 같이 함수 안에서 사용할 타입을 넘겨줄 수 있습니다.

```ts
getText<string>("hi");
getText<number>(10);
getText<boolean>(true);
```

위 코드 중 `getText<string>('hi')`를 호출 했을 때 함수에서 제네릭이 어떻게 동작하는지 살펴보겠습니다.

```ts
function getText<string>(text: T): T {
  return text;
}
```

먼저 위 함수에서 제네릭 타입이 `<string>`이 되는 이유는 `getText()` 함수를 호출할 때 제네릭(함수에서 사용할 타입) 값으로 string을 넘겼기 때문입니다.

```ts
getText<string>();
// 그리고 나서 함수의 인자로 hi 라는 값을 아래와 같이 넘기게 되면

getText<string>("hi");
// getText 함수는 아래와 같이 타입을 정의한 것과 같습니다.

function getText<string>(text: string): string {
  return text;
}
```

위 함수는 입력 값의 타입이 string이면서 반환 값 타입도 string이어야 합니다.

### 제네릭을 사용하는 이유

또 다른 예제를 살펴보겠습니다.

```ts
function logText(text: string): string {
  return text;
}
```

위 코드는 인자를 하나 넘겨 받아 반환해주는 함수입니다. 이 함수의 인자와 반환 값은 모두 `string`으로 지정되어 있지만 만약 여러 가지 타입을 허용하고 싶다면 아래와 같이 `any`를 사용할 수 있습니다.

```ts
function logText(text: any): any {
  return text;
}
```

이렇게 타입을 바꾼다고 해서 함수의 동작에 문제가 생기진 않습니다.
다만, 함수의 인자로 어떤 타입이 들어갔고 어떤 값이 반환되는지는 알 수가 없습니다. 왜냐하면 any라는 타입은 타입 검사를 하지 않기 때문입니다.

이러한 문제점을 해결할 수 있는 것이 제네릭입니다. 아래 코드를 보겠습니다.

```ts
function logText<T>(text: T): T {
  return text;
}
```

먼저 함수의 이름 바로 뒤에 `<T>` 라는 코드를 추가했습니다. 그리고 함수의 인자와 반환 값에 모두 `T` 라는 타입을 추가합니다.
이렇게 되면 함수를 호출할 때 넘긴 타입에 대해 타입스크립트가 추정할 수 있게 됩니다. 따라서, 함수의 입력 값에 대한 타입과 출력 값에 대한 타입이 동일한지 검증할 수 있게 됩니다.

그리고 이렇게 선언한 함수는 아래와 같이 2가지 방법으로 호출할 수 있습니다.

```ts
// #1
const text = logText<string>("Hello Generic");
// #2
const text = logText("Hello Generic");
```

보통 두 번째 방법이 코드도 더 짧고 가독성이 좋기 때문에 흔하게 사용됩니다. 그렇지만 만약 복잡한 코드에서 두 번째 코드로 타입 추정이 되지 않는다면 첫 번째 방법을 사용하면 됩니다.

### 제네릭 타입 변수

앞에서 배운 내용으로 제네릭을 사용하기 시작하면 컴파일러에서 인자에 타입을 넣어달라는 경고를 보게 됩니다.

조금 전에 살펴본 코드를 다시 보겠습니다.

```ts
function logText<T>(text: T): T {
  return text;
}
```

만약 여기서 함수의 인자로 받은 값의 length를 확인하고 싶다면 어떻게 해야 할까요? 아마 아래와 같이 코드를 작성할 겁니다.

```ts
function logText<T>(text: T): T {
  console.log(text.length); // Error: T doesn't have .length
  return text;
}
```

위 코드를 변환하려고 하면 컴파일러에서 에러를 발생시킵니다. 왜냐하면 `text`에 `.length`가 있다는 단서는 어디에도 없기 때문이죠.

다시 위 제네릭 코드의 의미를 살펴보면 함수의 인자와 반환 값에 대한 타입을 정하진 않았지만, 입력 값으로 어떤 타입이 들어왔고 반환 값으로 어떤 타입이 나가는지 알 수 있습니다.
따라서, 함수의 인자와 반환 값 타입에 마치 `any`를 지정한 것과 같은 동작을 한다는 것을 알 수 있죠. 그래서 설령 인자에 `number` 타입을 넘기더라도 에러가 나진 않습니다.
이러한 특성 때문에 현재 인자인 `text`에 문자열이나 배열이 들어와도 아직은 컴파일러 입장에서 `.length`를 허용할 순 없습니다. 왜냐하면 `number`가 들어왔을 때는 `.length` 코드가 유효하지 않으니까요.

그래서 이런 경우에는 아래와 같이 제네릭에 타입을 줄 수가 있습니다.

```ts
function logText<T>(text: T[]): T[] {
  console.log(text.length); // 제네릭 타입이 배열이기 때문에 `length`를 허용합니다.
  return text;
}
```

위 코드가 기존의 제네릭 코드와 다른 점은 인자의 `T[]` 부분입니다.
이 제네릭 함수 코드는 일단 `T`라는 변수 타입을 받고, 인자 값으로는 배열 형태의 `T`를 받습니다. 예를 들면, 함수에 [1,2,3]처럼 숫자로 이뤄진 배열을 받으면 반환 값으로 `number`를 돌려주는 것이죠.
이런 방식으로 제네릭을 사용하면 꽤 유연한 방식으로 함수의 타입을 정의해줄 수 있습니다.

혹은 다음과 같이 좀 더 명시적으로 제네릭 타입을 선언할 수 있습니다.

```ts
function logText<T>(text: Array<T>): Array<T> {
  console.log(text.length);
  return text;
}
```

### 제네릭 타입

제네릭 인터페이스에 대해 알아보겠습니다. 아래의 두 코드는 같은 의미입니다.

```ts
function logText<T>(text: T): T {
  return text;
}
// #1
let str: <T>(text: T) => T = logText;
// #2
let str: { <T>(text: T): T } = logText;
```

위와 같은 변형 방식으로 제네릭 인터페이스 코드를 다음과 같이 작성할 수 있습니다.

```ts
interface GenericLogTextFn {
  <T>(text: T): T;
}
function logText<T>(text: T): T {
  return text;
}
let myString: GenericLogTextFn = logText; // Okay
```

위 코드에서 만약 인터페이스에 인자 타입을 강조하고 싶다면 아래와 같이 변경할 수 있습니다.

```ts
interface GenericLogTextFn<T> {
  (text: T): T;
}
function logText<T>(text: T): T {
  return text;
}
let myString: GenericLogTextFn<string> = logText;
```

이와 같은 방식으로 제네릭 인터페이스 뿐만 아니라 클래스도 생성할 수 있습니다. 다만, 이넘(enum)과 네임스페이스(namespace)는 제네릭으로 생성할 수 없습니다.

### 제네릭 클래스

제네릭 클래스는 앞에서 살펴본 제네릭 인터페이스와 비슷합니다. 코드를 보겠습니다.

```ts
class GenericMath<T> {
  pi: T;
  sum: (x: T, y: T) => T;
}

let math = new GenericMath<number>();
```

제네릭 클래스를 선언할 때 클래스 이름 오른쪽에 `<T>`를 붙여줍니다. 그리고 해당 클래스로 인스턴스를 생성할 때 타입에 어떤 값이 들어갈 지 지정하면 됩니다.

조금 전에 살펴본 인터페이스처럼 제네릭 클래스도 클래스 안에 정의된 속성들이 정해진 타입으로 잘 동작하게 보장할 수 있습니다.

### 제네릭 제약 조건

앞에서 제네릭 타입 변수에서 살펴본 내용 말고도 제네릭 함수에 어느 정도 타입 힌트를 줄 수 있는 방법이 있습니다. 잠시 이전 코드를 보겠습니다.

```ts
function logText<T>(text: T): T {
  console.log(text.length); // Error: T doesn't have .length
  return text;
}
```

인자의 타입에 선언한 `T`는 아직 어떤 타입인지 구체적으로 정의하지 않았기 때문에 `length` 코드에서 오류가 납니다. 이럴 때 만약 해당 타입을 정의하지 않고도 `length` 속성 정도는 허용하려면 아래와 같이 작성합니다.

```ts
interface LengthWise {
  length: number;
}

function logText<T extends LengthWise>(text: T): T {
  console.log(text.length);
  return text;
}
```

위와 같이 작성하게 되면 타입에 대한 강제는 아니지만 `length`에 대해 동작하는 인자만 넘겨받을 수 있게 됩니다.

```ts
logText(10); // Error, 숫자 타입에는 `length`가 존재하지 않으므로 오류 발생
logText({ length: 0, value: "hi" }); // `text.length` 코드는 객체의 속성 접근과 같이 동작하므로 오류 없음
```

### 객체의 속성을 제약하는 방법

두 객체를 비교할 때도 제네릭 제약 조건을 사용할 수 있습니다.

```ts
function getProperty<T, O extends keyof T>(obj: T, key: O) {
  return obj[key];
}
let obj = { a: 1, b: 2, c: 3 };
getProperty(obj, "a"); // okay
getProperty(obj, "z"); // error: "z"는 "a", "b", "c" 속성에 해당하지 않습니다.
```

제네릭을 선언할 때 `<O extends keyof T>` 부분에서 첫 번째 인자로 받는 객체에 없는 속성들은 접근할 수 없게끔 제한하였습니다.

## 타입추론

### 타입 추론(Type Inference)

- 타입 추론이란 타입스크립트가 코드를 해석해 나가는 동작을 의미합니다.

### 타입 추론의 기본

타입스크립트가 타입 추론을 해나가는 과정은 다음과 같습니다.

```ts
let x = 3;
```

위와 같이 `x`에 대한 타입을 따로 지정하지 않더라도 일단 `x`는 `number`로 간주됩니다.
이렇게 변수를 선언하거나 초기화 할 때 타입이 추론됩니다. 이외에도 변수, 속성, 인자의 기본 값, 함수의 반환 값 등을 설정할 때 타입 추론이 일어납니다.

### 가장 적절한 타입(Best Common Type)

타입은 보통 몇 개의 표현식(코드)을 바탕으로 타입을 추론합니다.
그리고 그 표현식을 이용하여 가장 근접한 타입을 추론하게 되는데 이 가장 근접한 타입을 Best Common Type이라고 합니다.

잠깐 예제를 보겠습니다.

```ts
let arr = [0, 1, null];
```

위 변수 `arr`의 타입을 추론하기 위해서는 배열의 각 아이템을 살펴봐야 합니다.
배열의 각 아이템의 타입은 크게 `number`와 `null`로 구분됩니다. 이 때 Best Common Type 알고리즘으로 다른 타입들과 가장 잘 호환되는 타입을 선정합니다.

### 문맥상의 타이핑(Contextual Typing)

타입스크립트에서 타입을 추론하는 또 하나의 방식은 바로 문맥상으로 타입을 결정하는 것입니다.
이 문맥상의 타이핑(타입 결정)은 코드의 위치(문맥)를 기준으로 일어납니다.

```ts
window.onmousedown = function (mouseEvent) {
  console.log(mouseEvent.button); //<- OK
  console.log(mouseEvent.kangaroo); //<- Error!
};
```

위 코드를 타입스크립트 검사기 관점에서 보면 `window.onmousedown`에 할당되는 함수의 타입을 추론하기 위해 window.onmousedown 타입을 검사합니다.
타입 검사가 끝나고 나면 함수의 타입이 마우스 이벤트와 연관이 있다고 추론하기 때문에 `mouseEvent` 인자에 `button` 속성은 있지만 `kangaroo` 속성은 없다고 결론을 내립니다.

```ts
window.onscroll = function (uiEvent) {
  console.log(uiEvent.button); //<- Error!
};
```

앞의 예제와 마찬가지로 오른쪽의 함수는 `window.onscroll`에 할당되었기 때문에 함수의 인자 `uiEvent`는 `UIEvent`으로 간주됩니다.
그래서 앞에서 봤던 MouseEvent와는 다르게 `button` 속성이 없다고 추론합니다. 그러므로 `uiEvent.button`에서 에러가 나죠.

여기서 만약 문맥상 타이핑을 좀 더 이해하고자 한다면 아래와 같이 코드를 바꿔볼 수도 있습니다.

```ts
const handler = function (uiEvent) {
  console.log(uiEvent.button); //<- OK
};
```

오른쪽 함수 표현식이 앞의 예제와 동일하지만 함수가 할당되는 변수만으로는 타입을 추정하기 어렵기 때문에 아무 에러가 나지 않습니다.

> 위 코드에서 --noImplicitAny 옵션을 사용하면 에러납니다

### 타입스크립트의 타입 체킹

타입 체킹에 있어서 타입스크립트의 지향점은 타입 체크는 값의 형태에 기반하여 이루어져야 한다는 점입니다. 이걸 Duck Typing 또는 Structural Subtyping 이라고 합니다.
::: tip
Duck Typing : 객체의 변수 및 메서드의 집합이 객체의 타입을 결정하는 것을 의미. 동적 타이핑의 한 종류 Structural Subtyping : 객체의 실제 구조나 정의에 따라 타입을 결정하는 것을 의미
:::

## 타입 호환(Type Compatibility)

- 타입 호환이란 타입스크립트 코드에서 특정 타입이 다른 타입에 잘 맞는지를 의미합니다. 예를 들면 아래와 같은 코드를 의미합니다.

```ts
interface Ironman {
  name: string;
}

class Avengers {
  name: string;
}

let i: Ironman;
i = new Avengers(); // OK, because of structural typing
```

C#이나 Java였다면 위 코드에서 에러가 날겁니다. 왜냐하면 Avengers 클래스가 명시적으로 Ironman 인터페이스를 상속받아 구현하지 않았기 때문입니다.

하지만 위와 같은 코드가 타입스크립트에서 정상적으로 동작하는 이유는 자바스크립트의 작동 방식과 관련이 있습니다.
기본적으로 자바스크립트는 객체 리터럴이나 익명 함수 등을 사용하기 때문에 명시적으로 타입을 지정하는 것보다는 코드의 구조 관점에서 타입을 지정하는 것이 더 잘 어울립니다.

### 구조적 타이핑 예시

구조적 타이핑(structural typing)이란 코드 구조 관점에서 타입이 서로 호환되는지의 여부를 판단하는 것입니다. 아래 코드를 보겠습니다.

```ts
interface Avengers {
  name: string;
}

let hero: Avengers;
// 타입스크립트가 추론한 y의 타입은 { name: string; location: string; } 입니다.
let capt = { name: "Captain", location: "Pangyo" };
hero = capt;
```

위 코드에서 capt가 hero 타입에 호환될 수 있는 이유는 capt의 속성 중에 name이 있기 때문입니다. Avengers 인터페이스에서 name 속성을 갖고 있기 때문에 capt는 Avengers 타입에 호환될 수 있죠.

함수를 호출할 때도 마찬가지입니다.

```ts
function assemble(a: Avengers) {
  console.log("어벤져스 모여라", a.name);
}
// 위에서 정의한 capt 변수. 타입은 { name: string; location: string; }
assemble(capt);
```

`capt` 변수에 이미 `name` 속성 뿐만 아니라 `location` 속성도 있기 때문에 assemble 함수의 호출 인자로 넘길 수 있습니다.

### Soundness란?

타입스크립트는 컴파일 시점에 타입을 추론할 수 없는 특정 타입에 대해서 일단 안전하다고 보는 특성이 있습니다.
이걸 "들리지 않는다(it is said to not be sound)"라고 표현합니다.

### Enum 타입 호환 주의 사항

이넘 타입은 number 타입과 호환되지만 이넘 타입끼리는 호환되지 않습니다.

```ts
enum Status {
  Ready,
  Waiting,
}
enum Color {
  Red,
  Blue,
  Green,
}

let status = Status.Ready;
status = Color.Green; // Error
```

### Class 타입 호환 주의 사항

클래스 타입은 클래스 타입끼리 비교할 때 스태틱 멤버(static member)와 생성자(constructor)를 제외하고 속성만 비교합니다.

```ts
class Hulk {
  handSize: number;
  constructor(name: string, numHand: number) {}
}

class Captain {
  handSize: number;
  constructor(numHand: number) {}
}

let a: Hulk;
let s: Captain;

a = s; // OK
s = a; // OK
```

### Generics

제네릭은 제네릭 타입 간의 호환 여부를 판단할 때 타입 인자 `<T>`가 속성에 할당 되었는지를 기준으로 합니다. 예시 코드를 보겠습니다.

```ts
interface Empty<T> {}
let x: Empty<number>;
let y: Empty<string>;

x = y; // OK, because y matches structure of x
```

위 인터페이스는 일단 속성(member 변수)이 없기 때문에 `x`와 `y`는 같은 타입으로 간주됩니다. 그런데 만약 아래와 같이 인터페이스에 속성이 있어서 제네릭의 타입 인자가 속성에 할당된다면 얘기는 다릅니다.

```ts
interface NotEmpty<T> {
  data: T;
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;

x = y; // Error, because x and y are not compatible
```

인터페이스 `NotEmpty`에 넘긴 제네릭 타입`<T>`이 `data` 속성에 할당되었으므로 `x`와 `y`는 서로 다른 타입으로 간주됩니다.

## 타입 별칭 (Type Aliases)

- 타입 별칭은 특정 타입이나 인터페이스를 참조할 수 있는 타입 변수를 의미합니다. 예를 들면 아래와 같습니다.

```ts
// string 타입을 사용할 때
const name: string = "capt";

// 타입 별칭을 사용할 때
type MyName = string;
const name: MyName = "capt";
```

위와 같이 `string`, `number`와 같은 간단한 타입 뿐만 아니라 `interface` 레벨의 복잡한 타입에도 별칭을 부여할 수 있습니다. 아래 코드와 같이 말이죠.

```ts
type Developer = {
  name: string;
  skill: string;
};
```

타입 별칭에 제네릭도 사용할 수 있습니다.

```ts
type User<T> = {
  name: T;
};
```

### type vs interface

> 타입 별칭과 인터페이스의 가장 큰 차이점은 타입의 확장 가능 / 불가능 여부입니다. 인터페이스는 확장이 가능한데 반해 타입 별칭은 확장이 불가능합니다. 따라서, 가능한한 type 보다는 interface로 선언해서 사용하는 것을 추천합니다.

## 타입 단언(Type Assertion)

타입 단언은 개발자가 해당 타입에 대해 확신이 있을 때 사용하는 타입 지정 방식입니다. 다른 언어의 타입 캐스팅과 비슷한 개념이며 타입스크립트를 컴파일 할 때 특별히 타입을 체크하지 않고, 데이터의 구조도 신경쓰지 않습니다.

### 타입 단언 기본 - as

- 타입 단언은 기본적으로 as 키워드를 이용해서 정의할 수 있습니다. 아래와 같은 코드가 있다고 합시다.

```ts
const name: string = "Capt";
```

이 코드는 타입 표기 방식을 이용해 `name` 이라는 변수의 타입은 `string` 이라고 정의한 코드입니다. 이 코드에 타입 단언을 적용하면 다음과 같습니다.

```ts
const name = "Capt" as string;
```

비주얼 스튜디오 코드에서 `name` 변수의 정보를 확인해 보면 동일하게 `string`으로 추론되는 것을 확인할 수 있습니다.

### 타입 단언은 언제 쓰는가?

타입 단언은 타입스크립트 컴파일러보다 개발자가 더 해당 타입을 잘 알고 있을 때 사용해야 합니다.
혹은, 자바스크립트 기반 코드에 점진적으로 타입스크립트를 적용할 때도 자주 사용됩니다. 예를 들어, 다음과 같은 자바스크립트 코드가 있다고 합시다.

```js
// app.js
const capt = {};
capt.name = "캡틴";
capt.age = 100;
```

이 객체에 타입 표기 방식으로 타입을 정의하려고 하면 에러가 발생합니다.

```ts
interface Hero {
  name: string;
  age: number;
}

const capt: Hero = {}; // X. 오류 발생
capt.name = "캡틴";
capt.age = 100;
```

왜냐하면 `capt` 변수가 정의되는 시점에서 `name`, `age` 등의 속성이 정의되지 않았기 때문입니다. 기존에 운영하던 서비스의 코드가 위와 같다면 아래와 같이 코드를 변경하여 타입 오류를 해결할 수도 있습니다.

```ts
interface Hero {
  name: string;
  age: number;
}

const capt: Hero = {
  name: "캡틴",
  age: 100,
};
```

하지만, 기존 코드의 변경 없이 as 키워드로 타입 문제를 해결할 수 있습니다.

```ts
interface Hero {
  name: string;
  age: number;
}

const capt = {} as Hero; // 오류 없음
capt.name = "캡틴";
capt.age = 100;
```
